'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Maches parantheses or single square brackets or parantheses
 * and captures the enclosed text
 * If the brackets start a markdown link, they are ignored.
 * Wiki links don't need to be ignored since Obsidian overwrites suggestions for them.
 * We are not allowd to use lookbehinds, because iOS does not support them in older versions.
 */
const filledRegex = new RegExp([
    // pattern for parantheses
    // look for opening parantheses; no closing or opening square bracket before to exlude markdown links, etc.
    /(?:^\(|[^\[\]]\()/,
    /(.+?)/,
    // pos. lookahead for closing paranthesis; not followed by another one for nested ((test))
    /(?=\)$|\)[^\)])/,
    /|/,
    // pattern for square brackets
    // look for opening square brackets
    /(?:\[)/,
    /(.+?)/,
    // pos. lookahead for closing bracket; not followed by another one ([[test]]) or an opening paranthese (markdown link!)
    /(?=\]$|\][^\]\(])/,
]
    .map((s) => s.source)
    .join(""), "g");
/**
 * Finds the dataview metadata field the user is currently inside.
 * It returns [text, start, end] where text is the text inside the field,
 * and start and end are the cursor positions of the start and end of the field.
 * If the user is not inside a field, it returns null.
 */
function getTriggerText(line, cursorPos) {
    let match = getTriggerTextFromRegex(line, cursorPos, filledRegex);
    if (match !== null) {
        return match;
    }
    return null;
}
/**
 * Given a regex with a capture group, a line of text, and the users cursor position,
 * this function finds the match of the regex in the line that the user is currently inside.
 * If the user is inside the capture group, returns [text, start, end] where text is the text inside the match,
 * start is the position of the start of the match, and end is the position of the end of the match.
 * Otherwise, returns null.
 */
function getTriggerTextFromRegex(line, cursorPos, regex) {
    let matches = Array.from(line.matchAll(regex));
    for (const match of matches) {
        if (match.index === undefined) {
            continue;
        }
        const matchText = match[1] || match[2];
        const matchStart = match.index + match[0].indexOf(matchText);
        const matchEnd = matchStart + matchText.length;
        const cursorInMatch = cursorPos >= matchStart && cursorPos <= matchEnd;
        if (cursorInMatch) {
            return [matchText, matchStart, matchEnd];
        }
    }
    return null;
}

/**
* Copyright (c) 2024, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uFuzzy.js (μFuzzy)
* A tiny, efficient fuzzy matcher that doesn't suck
* https://github.com/leeoniya/uFuzzy (v1.0.17)
*/

const cmp = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

const inf = Infinity;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// meh, magic tmp placeholder, must be tolerant to toLocaleLowerCase(), interSplit, and intraSplit
const EXACT_HERE = 'eexxaacctt';

const PUNCT_RE = /\p{P}/gu;

const LATIN_UPPER = 'A-Z';
const LATIN_LOWER = 'a-z';

const swapAlpha = (str, upper, lower) => str.replace(LATIN_UPPER, upper).replace(LATIN_LOWER, lower);

const OPTS = {
	// whether regexps use a /u unicode flag
	unicode: false,

	alpha: null,

	// term segmentation & punct/whitespace merging
	interSplit: "[^A-Za-z\\d']+",
	intraSplit: "[a-z][A-Z]",

	// inter bounds that will be used to increase lft2/rgt2 info counters
	interBound: "[^A-Za-z\\d]",
	// intra bounds that will be used to increase lft1/rgt1 info counters
	intraBound: "[A-Za-z]\\d|\\d[A-Za-z]|[a-z][A-Z]",

	// inter-bounds mode
	// 2 = strict (will only match 'man' on whitepace and punct boundaries: Mega Man, Mega_Man, mega.man)
	// 1 = loose  (plus allowance for alpha-num and case-change boundaries: MegaMan, 0007man)
	// 0 = any    (will match 'man' as any substring: megamaniac)
	interLft: 0,
	interRgt: 0,

	// allowance between terms
	interChars: '.',
	interIns: inf,

	// allowance between chars in terms
	intraChars: "[a-z\\d']", // internally case-insensitive
	intraIns: null,

	intraContr: "'[a-z]{1,2}\\b",

	// multi-insert or single-error mode
	intraMode: 0,

	// single-error bounds for errors within terms, default requires exact first char
	intraSlice: [1, inf],

	// single-error tolerance toggles
	intraSub: null,
	intraTrn: null,
	intraDel: null,

	// can post-filter matches that are too far apart in distance or length
	// (since intraIns is between each char, it can accum to nonsense matches)
	intraFilt: (term, match, index) => true, // should this also accept WIP info?

	// final sorting fn
	sort: (info, haystack, needle) => {
		let {
			idx,
			chars,
			terms,
			interLft2,
			interLft1,
		//	interRgt2,
		//	interRgt1,
			start,
			intraIns,
			interIns,
			cases,
		} = info;

		return idx.map((v, i) => i).sort((ia, ib) => (
			// most contig chars matched
			chars[ib] - chars[ia] ||
			// least char intra-fuzz (most contiguous)
			intraIns[ia] - intraIns[ib] ||
			// most prefix bounds, boosted by full term matches
			(
				(terms[ib] + interLft2[ib] + 0.5 * interLft1[ib]) -
				(terms[ia] + interLft2[ia] + 0.5 * interLft1[ia])
			) ||
			// highest density of match (least span)
		//	span[ia] - span[ib] ||
			// highest density of match (least term inter-fuzz)
			interIns[ia] - interIns[ib] ||
			// earliest start of match
			start[ia] - start[ib] ||
			// case match
			cases[ib] - cases[ia] ||
			// alphabetic
			cmp(haystack[idx[ia]], haystack[idx[ib]])
		));
	},
};

const lazyRepeat = (chars, limit) => (
	limit == 0   ? ''           :
	limit == 1   ? chars + '??' :
	limit == inf ? chars + '*?' :
	               chars + `{0,${limit}}?`
);

const mode2Tpl = '(?:\\b|_)';

function uFuzzy(opts) {
	opts = Object.assign({}, OPTS, opts);

	let {
		unicode,
		interLft,
		interRgt,
		intraMode,
		intraSlice,
		intraIns,
		intraSub,
		intraTrn,
		intraDel,
		intraContr,
		intraSplit: _intraSplit,
		interSplit: _interSplit,
		intraBound: _intraBound,
		interBound: _interBound,
		intraChars,
	} = opts;

	intraIns ??= intraMode;
	intraSub ??= intraMode;
	intraTrn ??= intraMode;
	intraDel ??= intraMode;

	let alpha = opts.letters ?? opts.alpha;

	if (alpha != null) {
		let upper = alpha.toLocaleUpperCase();
		let lower = alpha.toLocaleLowerCase();

		_interSplit = swapAlpha(_interSplit, upper, lower);
		_intraSplit = swapAlpha(_intraSplit, upper, lower);
		_interBound = swapAlpha(_interBound, upper, lower);
		_intraBound = swapAlpha(_intraBound, upper, lower);
		intraChars = swapAlpha(intraChars, upper, lower);
		intraContr = swapAlpha(intraContr, upper, lower);
	}

	let uFlag = unicode ? 'u' : '';

	const quotedAny = '".+?"';
	const EXACTS_RE = new RegExp(quotedAny, 'gi' + uFlag);
	const NEGS_RE = new RegExp(`(?:\\s+|^)-(?:${intraChars}+|${quotedAny})`, 'gi' + uFlag);

	let { intraRules } = opts;

	if (intraRules == null) {
		intraRules = p => {
			// default is exact term matches only
			let _intraSlice = OPTS.intraSlice, // requires first char
				_intraIns = 0,
				_intraSub = 0,
				_intraTrn = 0,
				_intraDel = 0;

			// only-digits strings should match exactly, else special rules for short strings
			if (/[^\d]/.test(p)) {
				let plen = p.length;

				// prevent junk matches by requiring stricter rules for short terms
				if (plen <= 4) {
					if (plen >= 3) {
						// one swap in non-first char when 3-4 chars
						_intraTrn = Math.min(intraTrn, 1);

						// or one insertion when 4 chars
						if (plen == 4)
							_intraIns = Math.min(intraIns, 1);
					}
					// else exact match when 1-2 chars
				}
				// use supplied opts
				else {
					_intraSlice = intraSlice;
					_intraIns = intraIns,
					_intraSub = intraSub,
					_intraTrn = intraTrn,
					_intraDel = intraDel;
				}
			}

			return {
				intraSlice: _intraSlice,
				intraIns: _intraIns,
				intraSub: _intraSub,
				intraTrn: _intraTrn,
				intraDel: _intraDel,
			};
		};
	}

	let withIntraSplit = !!_intraSplit;

	let intraSplit = new RegExp(_intraSplit, 'g' + uFlag);
	let interSplit = new RegExp(_interSplit, 'g' + uFlag);

	let trimRe = new RegExp('^' + _interSplit + '|' + _interSplit + '$', 'g' + uFlag);
	let contrsRe = new RegExp(intraContr, 'gi' + uFlag);

	const split = (needle, keepCase = false) => {
		let exacts = [];

		needle = needle.replace(EXACTS_RE, m => {
			exacts.push(m);
			return EXACT_HERE;
		});

		needle = needle.replace(trimRe, '');

		if (!keepCase)
			needle = needle.toLocaleLowerCase();

		if (withIntraSplit)
			needle = needle.replace(intraSplit, m => m[0] + ' ' + m[1]);

		let j = 0;
		return needle.split(interSplit).filter(t => t != '').map(v => v === EXACT_HERE ? exacts[j++] : v);
	};

	const NUM_OR_ALPHA_RE = /[^\d]+|\d+/g;

	const prepQuery = (needle, capt = 0, interOR = false) => {
		// split on punct, whitespace, num-alpha, and upper-lower boundaries
		let parts = split(needle);

		if (parts.length == 0)
			return [];

		// split out any detected contractions for each term that become required suffixes
		let contrs = Array(parts.length).fill('');
		parts = parts.map((p, pi) => p.replace(contrsRe, m => {
			contrs[pi] = m;
			return '';
		}));

		// array of regexp tpls for each term
		let reTpl;

		// allows single mutations within each term
		if (intraMode == 1) {
			reTpl = parts.map((p, pi) => {
				if (p[0] === '"')
					return escapeRegExp(p.slice(1, -1));

				let reTpl = '';

				// split into numeric and alpha parts, so numbers are only matched as following punct or alpha boundaries, without swaps or insertions
				for (let m of p.matchAll(NUM_OR_ALPHA_RE)) {
					let p = m[0];

					let {
						intraSlice,
						intraIns,
						intraSub,
						intraTrn,
						intraDel,
					} = intraRules(p);

					if (intraIns + intraSub + intraTrn + intraDel == 0)
						reTpl += p + contrs[pi];
					else {
						let [lftIdx, rgtIdx] = intraSlice;
						let lftChar = p.slice(0, lftIdx); // prefix
						let rgtChar = p.slice(rgtIdx);    // suffix

						let chars = p.slice(lftIdx, rgtIdx);

						// neg lookahead to prefer matching 'Test' instead of 'tTest' in ManifestTest or fittest
						// but skip when search term contains leading repetition (aardvark, aaa)
						if (intraIns == 1 && lftChar.length == 1 && lftChar != chars[0])
							lftChar += '(?!' + lftChar + ')';

						let numChars = chars.length;

						let variants = [p];

						// variants with single char substitutions
						if (intraSub) {
							for (let i = 0; i < numChars; i++)
								variants.push(lftChar + chars.slice(0, i) + intraChars + chars.slice(i + 1) + rgtChar);
						}

						// variants with single transpositions
						if (intraTrn) {
							for (let i = 0; i < numChars - 1; i++) {
								if (chars[i] != chars[i+1])
									variants.push(lftChar + chars.slice(0, i) + chars[i+1] + chars[i] + chars.slice(i + 2) + rgtChar);
							}
						}

						// variants with single char omissions
						if (intraDel) {
							for (let i = 0; i < numChars; i++)
								variants.push(lftChar + chars.slice(0, i + 1) + '?' + chars.slice(i + 1) + rgtChar);
						}

						// variants with single char insertions
						if (intraIns) {
							let intraInsTpl = lazyRepeat(intraChars, 1);

							for (let i = 0; i < numChars; i++)
								variants.push(lftChar + chars.slice(0, i) + intraInsTpl + chars.slice(i) + rgtChar);
						}

						reTpl += '(?:' + variants.join('|') + ')' + contrs[pi];
					}
				}

			//	console.log(reTpl);

				return reTpl;
			});
		}
		else {
			let intraInsTpl = lazyRepeat(intraChars, intraIns);

			// capture at char level
			if (capt == 2 && intraIns > 0) {
				// sadly, we also have to capture the inter-term junk via parenth-wrapping .*?
				// to accum other capture groups' indices for \b boosting during scoring
				intraInsTpl = ')(' + intraInsTpl + ')(';
			}

			reTpl = parts.map((p, pi) => p[0] === '"' ? escapeRegExp(p.slice(1, -1)) :  p.split('').map((c, i, chars) => {
				// neg lookahead to prefer matching 'Test' instead of 'tTest' in ManifestTest or fittest
				// but skip when search term contains leading repetition (aardvark, aaa)
				if (intraIns == 1 && i == 0 && chars.length > 1 && c != chars[i+1])
					c += '(?!' + c + ')';

				return c;
			}).join(intraInsTpl) + contrs[pi]);
		}

	//	console.log(reTpl);

		// this only helps to reduce initial matches early when they can be detected
		// TODO: might want a mode 3 that excludes _
		let preTpl = interLft == 2 ? mode2Tpl : '';
		let sufTpl = interRgt == 2 ? mode2Tpl : '';

		let interCharsTpl = sufTpl + lazyRepeat(opts.interChars, opts.interIns) + preTpl;

		// capture at word level
		if (capt > 0) {
			if (interOR) {
				// this is basically for doing .matchAll() occurence counting and highlighting without needing permuted ooo needles
				reTpl = preTpl + '(' + reTpl.join(')' + sufTpl + '|' + preTpl + '(') + ')' + sufTpl;
			}
			else {
				// sadly, we also have to capture the inter-term junk via parenth-wrapping .*?
				// to accum other capture groups' indices for \b boosting during scoring
				reTpl = '(' + reTpl.join(')(' + interCharsTpl + ')(') + ')';
				reTpl = '(.??' + preTpl + ')' + reTpl + '(' + sufTpl + '.*)'; // nit: trailing capture here assumes interIns = Inf
			}
		}
		else {
			reTpl = reTpl.join(interCharsTpl);
			reTpl = preTpl + reTpl + sufTpl;
		}

	//	console.log(reTpl);

		return [new RegExp(reTpl, 'i' + uFlag), parts, contrs];
	};

	const filter = (haystack, needle, idxs) => {

		let [query] = prepQuery(needle);

		if (query == null)
			return null;

		let out = [];

		if (idxs != null) {
			for (let i = 0; i < idxs.length; i++) {
				let idx = idxs[i];
				query.test(haystack[idx]) && out.push(idx);
			}
		}
		else {
			for (let i = 0; i < haystack.length; i++)
				query.test(haystack[i]) && out.push(i);
		}

		return out;
	};

	let withIntraBound = !!_intraBound;

	let interBound = new RegExp(_interBound, uFlag);
	let intraBound = new RegExp(_intraBound, uFlag);

	const info = (idxs, haystack, needle) => {

		let [query, parts, contrs] = prepQuery(needle, 1);
		let partsCased = split(needle, true);
		let [queryR] = prepQuery(needle, 2);
		let partsLen = parts.length;

		let _terms      = Array(partsLen);
		let _termsCased = Array(partsLen);

		for (let j = 0; j < partsLen; j++) {
			let part      = parts[j];
			let partCased = partsCased[j];

			let term      = part[0]      == '"' ? part.slice(1, -1)      : part      + contrs[j];
			let termCased = partCased[0] == '"' ? partCased.slice(1, -1) : partCased + contrs[j];

			_terms[j]      = term;
			_termsCased[j] = termCased;
		}

		let len = idxs.length;

		let field = Array(len).fill(0);

		let info = {
			// idx in haystack
			idx: Array(len),

			// start of match
			start: field.slice(),
			// length of match
		//	span: field.slice(),

			// contiguous chars matched
			chars: field.slice(),

			// case matched in term (via term.includes(match))
			cases: field.slice(),

			// contiguous (no fuzz) and bounded terms (intra=0, lft2/1, rgt2/1)
			// excludes terms that are contiguous but have < 2 bounds (substrings)
			terms: field.slice(),

			// cumulative length of unmatched chars (fuzz) within span
			interIns: field.slice(), // between terms
			intraIns: field.slice(), // within terms

			// interLft/interRgt counters
			interLft2: field.slice(),
			interRgt2: field.slice(),
			interLft1: field.slice(),
			interRgt1: field.slice(),

			ranges: Array(len),
		};

		// might discard idxs based on bounds checks
		let mayDiscard = interLft == 1 || interRgt == 1;

		let ii = 0;

		for (let i = 0; i < idxs.length; i++) {
			let mhstr = haystack[idxs[i]];

			// the matched parts are [full, junk, term, junk, term, junk]
			let m = mhstr.match(query);

			// leading junk
			let start = m.index + m[1].length;

			let idxAcc = start;
		//	let span = m[0].length;

			let disc = false;
			let lft2 = 0;
			let lft1 = 0;
			let rgt2 = 0;
			let rgt1 = 0;
			let chars = 0;
			let terms = 0;
			let cases = 0;
			let inter = 0;
			let intra = 0;

			let refine = [];

			for (let j = 0, k = 2; j < partsLen; j++, k+=2) {
				let group     = m[k].toLocaleLowerCase();
				let term      = _terms[j];
				let termCased = _termsCased[j];
				let termLen   = term.length;
				let groupLen  = group.length;
				let fullMatch = group == term;

				if (m[k] == termCased)
					cases++;

				// this won't handle the case when an exact match exists across the boundary of the current group and the next junk
				// e.g. blob,ob when searching for 'bob' but finding the earlier `blob` (with extra insertion)
				if (!fullMatch && m[k+1].length >= termLen) {
					// probe for exact match in inter junk (TODO: maybe even in this matched part?)
					let idxOf = m[k+1].toLocaleLowerCase().indexOf(term);

					if (idxOf > -1) {
						refine.push(idxAcc, groupLen, idxOf, termLen);
						idxAcc += refineMatch(m, k, idxOf, termLen);
						group = term;
						groupLen = termLen;
						fullMatch = true;

						if (j == 0)
							start = idxAcc;
					}
				}

				if (mayDiscard || fullMatch) {
					// does group's left and/or right land on \b
					let lftCharIdx = idxAcc - 1;
					let rgtCharIdx = idxAcc + groupLen;

					let isPre = false;
					let isSuf = false;

					// prefix info
					if (lftCharIdx == -1           || interBound.test(mhstr[lftCharIdx])) {
						fullMatch && lft2++;
						isPre = true;
					}
					else {
						if (interLft == 2) {
							disc = true;
							break;
						}

						if (withIntraBound && intraBound.test(mhstr[lftCharIdx] + mhstr[lftCharIdx + 1])) {
							fullMatch && lft1++;
							isPre = true;
						}
						else {
							if (interLft == 1) {
								// regexps are eager, so try to improve the match by probing forward inter junk for exact match at a boundary
								let junk = m[k+1];
								let junkIdx = idxAcc + groupLen;

								if (junk.length >= termLen) {
									let idxOf = 0;
									let found = false;
									let re = new RegExp(term, 'ig' + uFlag);

									let m2;
									while (m2 = re.exec(junk)) {
										idxOf = m2.index;

										let charIdx = junkIdx + idxOf;
										let lftCharIdx = charIdx - 1;

										if (lftCharIdx == -1 || interBound.test(mhstr[lftCharIdx])) {
											lft2++;
											found = true;
											break;
										}
										else if (intraBound.test(mhstr[lftCharIdx] + mhstr[charIdx])) {
											lft1++;
											found = true;
											break;
										}
									}

									if (found) {
										isPre = true;

										// identical to exact term refinement pass above
										refine.push(idxAcc, groupLen, idxOf, termLen);
										idxAcc += refineMatch(m, k, idxOf, termLen);
										group = term;
										groupLen = termLen;
										fullMatch = true;

										if (j == 0)
											start = idxAcc;
									}
								}

								if (!isPre) {
									disc = true;
									break;
								}
							}
						}
					}

					// suffix info
					if (rgtCharIdx == mhstr.length || interBound.test(mhstr[rgtCharIdx])) {
						fullMatch && rgt2++;
						isSuf = true;
					}
					else {
						if (interRgt == 2) {
							disc = true;
							break;
						}

						if (withIntraBound && intraBound.test(mhstr[rgtCharIdx - 1] + mhstr[rgtCharIdx])) {
							fullMatch && rgt1++;
							isSuf = true;
						}
						else {
							if (interRgt == 1) {
								disc = true;
								break;
							}
						}
					}

					if (fullMatch) {
						chars += termLen;

						if (isPre && isSuf)
							terms++;
					}
				}

				if (groupLen > termLen)
					intra += groupLen - termLen; // intraFuzz

				if (j > 0)
					inter += m[k-1].length; // interFuzz

				// TODO: group here is lowercased, which is okay for length cmp, but not more case-sensitive filts
				if (!opts.intraFilt(term, group, idxAcc)) {
					disc = true;
					break;
				}

				if (j < partsLen - 1)
					idxAcc += groupLen + m[k+1].length;
			}

			if (!disc) {
				info.idx[ii]       = idxs[i];
				info.interLft2[ii] = lft2;
				info.interLft1[ii] = lft1;
				info.interRgt2[ii] = rgt2;
				info.interRgt1[ii] = rgt1;
				info.chars[ii]     = chars;
				info.terms[ii]     = terms;
				info.cases[ii]     = cases;
				info.interIns[ii]  = inter;
				info.intraIns[ii]  = intra;

				info.start[ii] = start;
			//	info.span[ii] = span;

				// ranges
				let m = mhstr.match(queryR);

				let idxAcc = m.index + m[1].length;

				let refLen = refine.length;
				let ri = refLen > 0 ? 0 : Infinity;
				let lastRi = refLen - 4;

				for (let i = 2; i < m.length;) {
					let len = m[i].length;

					if (ri <= lastRi && refine[ri] == idxAcc) {
						let groupLen = refine[ri+1];
						let idxOf    = refine[ri+2];
						let termLen  = refine[ri+3];

						// advance to end of original (full) group match that includes intra-junk
						let j = i;
						let v = '';
						for (let _len = 0; _len < groupLen; j++) {
							v += m[j];
							_len += m[j].length;
						}

						m.splice(i, j - i, v);

						idxAcc += refineMatch(m, i, idxOf, termLen);

						ri += 4;
					}
					else {
						idxAcc += len;
						i++;
					}
				}

				idxAcc = m.index + m[1].length;

				let ranges = info.ranges[ii] = [];
				let from = idxAcc;
				let to = idxAcc;

				for (let i = 2; i < m.length; i++) {
					let len = m[i].length;

					idxAcc += len;

					if (i % 2 == 0)
						to = idxAcc;
					else if (len > 0) {
						ranges.push(from, to);
						from = to = idxAcc;
					}
				}

				if (to > from)
					ranges.push(from, to);

				ii++;
			}
		}

		// trim arrays
		if (ii < idxs.length) {
			for (let k in info)
				info[k] = info[k].slice(0, ii);
		}

		return info;
	};

	const refineMatch = (m, k, idxInNext, termLen) => {
		// shift the current group into the prior junk
		let prepend = m[k] + m[k+1].slice(0, idxInNext);
		m[k-1] += prepend;
		m[k]    = m[k+1].slice(idxInNext, idxInNext + termLen);
		m[k+1]  = m[k+1].slice(idxInNext + termLen);
		return prepend.length;
	};

	const OOO_TERMS_LIMIT = 5;

	// returns [idxs, info, order]
	const _search = (haystack, needle, outOfOrder, infoThresh = 1e3, preFiltered) => {
		outOfOrder = !outOfOrder ? 0 : outOfOrder === true ? OOO_TERMS_LIMIT : outOfOrder;

		let needles = null;
		let matches = null;

		let negs = [];

		needle = needle.replace(NEGS_RE, m => {
			let neg = m.trim().slice(1);

			neg = neg[0] === '"' ? escapeRegExp(neg.slice(1,-1)) :  neg.replace(PUNCT_RE, '');

			if (neg != '')
				negs.push(neg);

			return '';
		});

		let terms = split(needle);

		let negsRe;

		if (negs.length > 0) {
			negsRe = new RegExp(negs.join('|'), 'i' + uFlag);

			if (terms.length == 0) {
				let idxs = [];

				for (let i = 0; i < haystack.length; i++) {
					if (!negsRe.test(haystack[i]))
						idxs.push(i);
				}

				return [idxs, null, null];
			}
		}
		else {
			// abort search (needle is empty after pre-processing, e.g. no alpha-numeric chars)
			if (terms.length == 0)
				return [null, null, null];
		}

	//	console.log(negs);
	//	console.log(needle);

		if (outOfOrder > 0) {
			// since uFuzzy is an AND-based search, we can iteratively pre-reduce the haystack by searching
			// for each term in isolation before running permutations on what's left.
			// this is a major perf win. e.g. searching "test man ger pp a" goes from 570ms -> 14ms
			let terms = split(needle);

			if (terms.length > 1) {
				// longest -> shortest
				let terms2 = terms.slice().sort((a, b) => b.length - a.length);

				for (let ti = 0; ti < terms2.length; ti++) {
					// no haystack item contained all terms
					if (preFiltered?.length == 0)
						return [[], null, null];

					preFiltered = filter(haystack, terms2[ti], preFiltered);
				}

				// avoid combinatorial explosion by limiting outOfOrder to 5 terms (120 max searches)
				// fall back to just filter() otherwise
				if (terms.length > outOfOrder)
					return [preFiltered, null, null];

				needles = permute(terms).map(perm => perm.join(' '));

				// filtered matches for each needle excluding same matches for prior needles
				matches = [];

				// keeps track of already-matched idxs to skip in follow-up permutations
				let matchedIdxs = new Set();

				for (let ni = 0; ni < needles.length; ni++) {
					if (matchedIdxs.size < preFiltered.length) {
						// filter further for this needle, exclude already-matched
						let preFiltered2 = preFiltered.filter(idx => !matchedIdxs.has(idx));

						let matched = filter(haystack, needles[ni], preFiltered2);

						for (let j = 0; j < matched.length; j++)
							matchedIdxs.add(matched[j]);

						matches.push(matched);
					}
					else
						matches.push([]);
				}
			}
		}

		// interOR
	//	console.log(prepQuery(needle, 1, null, true));

		// non-ooo or ooo w/single term
		if (needles == null) {
			needles = [needle];
			matches = [preFiltered?.length > 0 ? preFiltered : filter(haystack, needle)];
		}

		let retInfo = null;
		let retOrder = null;

		if (negs.length > 0)
			matches = matches.map(idxs => idxs.filter(idx => !negsRe.test(haystack[idx])));

		let matchCount = matches.reduce((acc, idxs) => acc + idxs.length, 0);

		// rank, sort, concat
		if (matchCount <= infoThresh) {
			retInfo = {};
			retOrder = [];

			for (let ni = 0; ni < matches.length; ni++) {
				let idxs = matches[ni];

				if (idxs == null || idxs.length == 0)
					continue;

				let needle = needles[ni];
				let _info = info(idxs, haystack, needle);
				let order = opts.sort(_info, haystack, needle);

				// offset idxs for concat'ing infos
				if (ni > 0) {
					for (let i = 0; i < order.length; i++)
						order[i] += retOrder.length;
				}

				for (let k in _info)
					retInfo[k] = (retInfo[k] ?? []).concat(_info[k]);

				retOrder = retOrder.concat(order);
			}
		}

		return [
			[].concat(...matches),
			retInfo,
			retOrder,
		];
	};

	return {
		search: (...args) => {
			let out = _search(...args);
			return out;
		},
		split,
		filter,
		info,
		sort: opts.sort,
	};
}

const latinize = (() => {
	let accents = {
		A: 'ÁÀÃÂÄĄ',
		a: 'áàãâäą',
		E: 'ÉÈÊËĖ',
		e: 'éèêëę',
		I: 'ÍÌÎÏĮ',
		i: 'íìîïį',
		O: 'ÓÒÔÕÖ',
		o: 'óòôõö',
		U: 'ÚÙÛÜŪŲ',
		u: 'úùûüūų',
		C: 'ÇČĆ',
		c: 'çčć',
		L: 'Ł',
		l: 'ł',
		N: 'ÑŃ',
		n: 'ñń',
		S: 'ŠŚ',
		s: 'šś',
		Z: 'ŻŹ',
		z: 'żź'
	};

	let accentsMap = new Map();
	let accentsTpl = '';

	for (let r in accents) {
		accents[r].split('').forEach(a => {
			accentsTpl += a;
			accentsMap.set(a, r);
		});
	}

	let accentsRe = new RegExp(`[${accentsTpl}]`, 'g');
	let replacer = m => accentsMap.get(m);

	return strings => {
		if (typeof strings == 'string')
			return strings.replace(accentsRe, replacer);

		let out = Array(strings.length);
		for (let i = 0; i < strings.length; i++)
			out[i] = strings[i].replace(accentsRe, replacer);
		return out;
	};
})();

// https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
function permute(arr) {
	arr = arr.slice();

	let length = arr.length,
		result = [arr.slice()],
		c = new Array(length).fill(0),
		i = 1, k, p;

	while (i < length) {
		if (c[i] < i) {
			k = i % 2 && c[i];
			p = arr[i];
			arr[i] = arr[k];
			arr[k] = p;
			++c[i];
			i = 1;
			result.push(arr.slice());
		} else {
			c[i] = 0;
			++i;
		}
	}

	return result;
}

const _mark = (part, matched) => matched ? `<mark>${part}</mark>` : part;
const _append = (acc, part) => acc + part;

function highlight(str, ranges, mark = _mark, accum = '', append = _append) {
	accum = append(accum, mark(str.substring(0, ranges[0]), false)) ?? accum;

	for (let i = 0; i < ranges.length; i+=2) {
		let fr = ranges[i];
		let to = ranges[i+1];

		accum = append(accum, mark(str.substring(fr, to), true)) ?? accum;

		if (i < ranges.length - 3)
			accum = append(accum, mark(str.substring(ranges[i+1], ranges[i+2]), false)) ?? accum;
	}

	accum = append(accum, mark(str.substring(ranges[ranges.length - 1]), false)) ?? accum;

	return accum;
}

uFuzzy.latinize = latinize;
uFuzzy.permute = arr => {
	let idxs = permute([...Array(arr.length).keys()]).sort((a,b) => {
		for (let i = 0; i < a.length; i++) {
			if (a[i] != b[i])
				return a[i] - b[i];
		}
		return 0;
	});

	return idxs.map(pi => pi.map(i => arr[i]));
};
uFuzzy.highlight = highlight;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var lib = {};

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	Object.defineProperty(lib, '__esModule', { value: true });



	// these aren't really private, but nor are they really useful to document

	/**
	 * @private
	 */
	class LuxonError extends Error {}

	/**
	 * @private
	 */
	class InvalidDateTimeError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid DateTime: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidIntervalError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Interval: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidDurationError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Duration: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class ConflictingSpecificationError extends LuxonError {}

	/**
	 * @private
	 */
	class InvalidUnitError extends LuxonError {
	  constructor(unit) {
	    super(`Invalid unit ${unit}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidArgumentError extends LuxonError {}

	/**
	 * @private
	 */
	class ZoneIsAbstractError extends LuxonError {
	  constructor() {
	    super("Zone is an abstract class");
	  }
	}

	/**
	 * @private
	 */

	const n = "numeric",
	  s = "short",
	  l = "long";

	const DATE_SHORT = {
	  year: n,
	  month: n,
	  day: n,
	};

	const DATE_MED = {
	  year: n,
	  month: s,
	  day: n,
	};

	const DATE_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s,
	};

	const DATE_FULL = {
	  year: n,
	  month: l,
	  day: n,
	};

	const DATE_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	};

	const TIME_SIMPLE = {
	  hour: n,
	  minute: n,
	};

	const TIME_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n,
	};

	const TIME_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s,
	};

	const TIME_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l,
	};

	const TIME_24_SIMPLE = {
	  hour: n,
	  minute: n,
	  hourCycle: "h23",
	};

	const TIME_24_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n,
	  hourCycle: "h23",
	};

	const TIME_24_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hourCycle: "h23",
	  timeZoneName: s,
	};

	const TIME_24_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hourCycle: "h23",
	  timeZoneName: l,
	};

	const DATETIME_SHORT = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n,
	};

	const DATETIME_SHORT_WITH_SECONDS = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n,
	};

	const DATETIME_MED = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n,
	};

	const DATETIME_MED_WITH_SECONDS = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n,
	};

	const DATETIME_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s,
	  hour: n,
	  minute: n,
	};

	const DATETIME_FULL = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  timeZoneName: s,
	};

	const DATETIME_FULL_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s,
	};

	const DATETIME_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  timeZoneName: l,
	};

	const DATETIME_HUGE_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l,
	};

	/**
	 * @interface
	 */
	class Zone {
	  /**
	   * The type of zone
	   * @abstract
	   * @type {string}
	   */
	  get type() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * The name of this zone.
	   * @abstract
	   * @type {string}
	   */
	  get name() {
	    throw new ZoneIsAbstractError();
	  }

	  get ianaName() {
	    return this.name;
	  }

	  /**
	   * Returns whether the offset is known to be fixed for the whole year.
	   * @abstract
	   * @type {boolean}
	   */
	  get isUniversal() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's common name (such as EST) at the specified timestamp
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the name
	   * @param {Object} opts - Options to affect the format
	   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
	   * @param {string} opts.locale - What locale to return the offset name in.
	   * @return {string}
	   */
	  offsetName(ts, opts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's value as a string
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the offset
	   * @param {string} format - What style of offset to return.
	   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	   * @return {string}
	   */
	  formatOffset(ts, format) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return the offset in minutes for this zone at the specified timestamp.
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to compute the offset
	   * @return {number}
	   */
	  offset(ts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is equal to another zone
	   * @abstract
	   * @param {Zone} otherZone - the zone to compare
	   * @return {boolean}
	   */
	  equals(otherZone) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is valid.
	   * @abstract
	   * @type {boolean}
	   */
	  get isValid() {
	    throw new ZoneIsAbstractError();
	  }
	}

	let singleton$1 = null;

	/**
	 * Represents the local zone for this JavaScript environment.
	 * @implements {Zone}
	 */
	class SystemZone extends Zone {
	  /**
	   * Get a singleton instance of the local zone
	   * @return {SystemZone}
	   */
	  static get instance() {
	    if (singleton$1 === null) {
	      singleton$1 = new SystemZone();
	    }
	    return singleton$1;
	  }

	  /** @override **/
	  get type() {
	    return "system";
	  }

	  /** @override **/
	  get name() {
	    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	  }

	  /** @override **/
	  get isUniversal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, { format, locale }) {
	    return parseZoneInfo(ts, format, locale);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    return -new Date(ts).getTimezoneOffset();
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "system";
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	let dtfCache = {};
	function makeDTF(zone) {
	  if (!dtfCache[zone]) {
	    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
	      hour12: false,
	      timeZone: zone,
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit",
	      second: "2-digit",
	      era: "short",
	    });
	  }
	  return dtfCache[zone];
	}

	const typeToPos = {
	  year: 0,
	  month: 1,
	  day: 2,
	  era: 3,
	  hour: 4,
	  minute: 5,
	  second: 6,
	};

	function hackyOffset(dtf, date) {
	  const formatted = dtf.format(date).replace(/\u200E/g, ""),
	    parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted),
	    [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
	  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
	}

	function partsOffset(dtf, date) {
	  const formatted = dtf.formatToParts(date);
	  const filled = [];
	  for (let i = 0; i < formatted.length; i++) {
	    const { type, value } = formatted[i];
	    const pos = typeToPos[type];

	    if (type === "era") {
	      filled[pos] = value;
	    } else if (!isUndefined(pos)) {
	      filled[pos] = parseInt(value, 10);
	    }
	  }
	  return filled;
	}

	let ianaZoneCache = {};
	/**
	 * A zone identified by an IANA identifier, like America/New_York
	 * @implements {Zone}
	 */
	class IANAZone extends Zone {
	  /**
	   * @param {string} name - Zone name
	   * @return {IANAZone}
	   */
	  static create(name) {
	    if (!ianaZoneCache[name]) {
	      ianaZoneCache[name] = new IANAZone(name);
	    }
	    return ianaZoneCache[name];
	  }

	  /**
	   * Reset local caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCache() {
	    ianaZoneCache = {};
	    dtfCache = {};
	  }

	  /**
	   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
	   * @param {string} s - The string to check validity on
	   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
	   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
	   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
	   * @return {boolean}
	   */
	  static isValidSpecifier(s) {
	    return this.isValidZone(s);
	  }

	  /**
	   * Returns whether the provided string identifies a real zone
	   * @param {string} zone - The string to check
	   * @example IANAZone.isValidZone("America/New_York") //=> true
	   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
	   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
	   * @return {boolean}
	   */
	  static isValidZone(zone) {
	    if (!zone) {
	      return false;
	    }
	    try {
	      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  constructor(name) {
	    super();
	    /** @private **/
	    this.zoneName = name;
	    /** @private **/
	    this.valid = IANAZone.isValidZone(name);
	  }

	  /** @override **/
	  get type() {
	    return "iana";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get isUniversal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, { format, locale }) {
	    return parseZoneInfo(ts, format, locale, this.name);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    const date = new Date(ts);

	    if (isNaN(date)) return NaN;

	    const dtf = makeDTF(this.name);
	    let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts
	      ? partsOffset(dtf, date)
	      : hackyOffset(dtf, date);

	    if (adOrBc === "BC") {
	      year = -Math.abs(year) + 1;
	    }

	    // because we're using hour12 and https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
	    const adjustedHour = hour === 24 ? 0 : hour;

	    const asUTC = objToLocalTS({
	      year,
	      month,
	      day,
	      hour: adjustedHour,
	      minute,
	      second,
	      millisecond: 0,
	    });

	    let asTS = +date;
	    const over = asTS % 1000;
	    asTS -= over >= 0 ? over : 1000 + over;
	    return (asUTC - asTS) / (60 * 1000);
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "iana" && otherZone.name === this.name;
	  }

	  /** @override **/
	  get isValid() {
	    return this.valid;
	  }
	}

	// todo - remap caching

	let intlLFCache = {};
	function getCachedLF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let dtf = intlLFCache[key];
	  if (!dtf) {
	    dtf = new Intl.ListFormat(locString, opts);
	    intlLFCache[key] = dtf;
	  }
	  return dtf;
	}

	let intlDTCache = {};
	function getCachedDTF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let dtf = intlDTCache[key];
	  if (!dtf) {
	    dtf = new Intl.DateTimeFormat(locString, opts);
	    intlDTCache[key] = dtf;
	  }
	  return dtf;
	}

	let intlNumCache = {};
	function getCachedINF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let inf = intlNumCache[key];
	  if (!inf) {
	    inf = new Intl.NumberFormat(locString, opts);
	    intlNumCache[key] = inf;
	  }
	  return inf;
	}

	let intlRelCache = {};
	function getCachedRTF(locString, opts = {}) {
	  const { base, ...cacheKeyOpts } = opts; // exclude `base` from the options
	  const key = JSON.stringify([locString, cacheKeyOpts]);
	  let inf = intlRelCache[key];
	  if (!inf) {
	    inf = new Intl.RelativeTimeFormat(locString, opts);
	    intlRelCache[key] = inf;
	  }
	  return inf;
	}

	let sysLocaleCache = null;
	function systemLocale() {
	  if (sysLocaleCache) {
	    return sysLocaleCache;
	  } else {
	    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
	    return sysLocaleCache;
	  }
	}

	function parseLocaleString(localeStr) {
	  // I really want to avoid writing a BCP 47 parser
	  // see, e.g. https://github.com/wooorm/bcp-47
	  // Instead, we'll do this:

	  // a) if the string has no -u extensions, just leave it alone
	  // b) if it does, use Intl to resolve everything
	  // c) if Intl fails, try again without the -u

	  // private subtags and unicode subtags have ordering requirements,
	  // and we're not properly parsing this, so just strip out the
	  // private ones if they exist.
	  const xIndex = localeStr.indexOf("-x-");
	  if (xIndex !== -1) {
	    localeStr = localeStr.substring(0, xIndex);
	  }

	  const uIndex = localeStr.indexOf("-u-");
	  if (uIndex === -1) {
	    return [localeStr];
	  } else {
	    let options;
	    let selectedStr;
	    try {
	      options = getCachedDTF(localeStr).resolvedOptions();
	      selectedStr = localeStr;
	    } catch (e) {
	      const smaller = localeStr.substring(0, uIndex);
	      options = getCachedDTF(smaller).resolvedOptions();
	      selectedStr = smaller;
	    }

	    const { numberingSystem, calendar } = options;
	    return [selectedStr, numberingSystem, calendar];
	  }
	}

	function intlConfigString(localeStr, numberingSystem, outputCalendar) {
	  if (outputCalendar || numberingSystem) {
	    if (!localeStr.includes("-u-")) {
	      localeStr += "-u";
	    }

	    if (outputCalendar) {
	      localeStr += `-ca-${outputCalendar}`;
	    }

	    if (numberingSystem) {
	      localeStr += `-nu-${numberingSystem}`;
	    }
	    return localeStr;
	  } else {
	    return localeStr;
	  }
	}

	function mapMonths(f) {
	  const ms = [];
	  for (let i = 1; i <= 12; i++) {
	    const dt = DateTime.utc(2009, i, 1);
	    ms.push(f(dt));
	  }
	  return ms;
	}

	function mapWeekdays(f) {
	  const ms = [];
	  for (let i = 1; i <= 7; i++) {
	    const dt = DateTime.utc(2016, 11, 13 + i);
	    ms.push(f(dt));
	  }
	  return ms;
	}

	function listStuff(loc, length, englishFn, intlFn) {
	  const mode = loc.listingMode();

	  if (mode === "error") {
	    return null;
	  } else if (mode === "en") {
	    return englishFn(length);
	  } else {
	    return intlFn(length);
	  }
	}

	function supportsFastNumbers(loc) {
	  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
	    return false;
	  } else {
	    return (
	      loc.numberingSystem === "latn" ||
	      !loc.locale ||
	      loc.locale.startsWith("en") ||
	      new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn"
	    );
	  }
	}

	/**
	 * @private
	 */

	class PolyNumberFormatter {
	  constructor(intl, forceSimple, opts) {
	    this.padTo = opts.padTo || 0;
	    this.floor = opts.floor || false;

	    const { padTo, floor, ...otherOpts } = opts;

	    if (!forceSimple || Object.keys(otherOpts).length > 0) {
	      const intlOpts = { useGrouping: false, ...opts };
	      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
	      this.inf = getCachedINF(intl, intlOpts);
	    }
	  }

	  format(i) {
	    if (this.inf) {
	      const fixed = this.floor ? Math.floor(i) : i;
	      return this.inf.format(fixed);
	    } else {
	      // to match the browser's numberformatter defaults
	      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
	      return padStart(fixed, this.padTo);
	    }
	  }
	}

	/**
	 * @private
	 */

	class PolyDateFormatter {
	  constructor(dt, intl, opts) {
	    this.opts = opts;
	    this.originalZone = undefined;

	    let z = undefined;
	    if (this.opts.timeZone) {
	      // Don't apply any workarounds if a timeZone is explicitly provided in opts
	      this.dt = dt;
	    } else if (dt.zone.type === "fixed") {
	      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
	      // That is why fixed-offset TZ is set to that unless it is:
	      // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
	      // 2. Unsupported by the browser:
	      //    - some do not support Etc/
	      //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
	      const gmtOffset = -1 * (dt.offset / 60);
	      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
	      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
	        z = offsetZ;
	        this.dt = dt;
	      } else {
	        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata so
	        // we manually apply the offset and substitute the zone as needed.
	        z = "UTC";
	        this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({ minutes: dt.offset });
	        this.originalZone = dt.zone;
	      }
	    } else if (dt.zone.type === "system") {
	      this.dt = dt;
	    } else if (dt.zone.type === "iana") {
	      this.dt = dt;
	      z = dt.zone.name;
	    } else {
	      // Custom zones can have any offset / offsetName so we just manually
	      // apply the offset and substitute the zone as needed.
	      z = "UTC";
	      this.dt = dt.setZone("UTC").plus({ minutes: dt.offset });
	      this.originalZone = dt.zone;
	    }

	    const intlOpts = { ...this.opts };
	    intlOpts.timeZone = intlOpts.timeZone || z;
	    this.dtf = getCachedDTF(intl, intlOpts);
	  }

	  format() {
	    if (this.originalZone) {
	      // If we have to substitute in the actual zone name, we have to use
	      // formatToParts so that the timezone can be replaced.
	      return this.formatToParts()
	        .map(({ value }) => value)
	        .join("");
	    }
	    return this.dtf.format(this.dt.toJSDate());
	  }

	  formatToParts() {
	    const parts = this.dtf.formatToParts(this.dt.toJSDate());
	    if (this.originalZone) {
	      return parts.map((part) => {
	        if (part.type === "timeZoneName") {
	          const offsetName = this.originalZone.offsetName(this.dt.ts, {
	            locale: this.dt.locale,
	            format: this.opts.timeZoneName,
	          });
	          return {
	            ...part,
	            value: offsetName,
	          };
	        } else {
	          return part;
	        }
	      });
	    }
	    return parts;
	  }

	  resolvedOptions() {
	    return this.dtf.resolvedOptions();
	  }
	}

	/**
	 * @private
	 */
	class PolyRelFormatter {
	  constructor(intl, isEnglish, opts) {
	    this.opts = { style: "long", ...opts };
	    if (!isEnglish && hasRelative()) {
	      this.rtf = getCachedRTF(intl, opts);
	    }
	  }

	  format(count, unit) {
	    if (this.rtf) {
	      return this.rtf.format(count, unit);
	    } else {
	      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
	    }
	  }

	  formatToParts(count, unit) {
	    if (this.rtf) {
	      return this.rtf.formatToParts(count, unit);
	    } else {
	      return [];
	    }
	  }
	}

	/**
	 * @private
	 */

	class Locale {
	  static fromOpts(opts) {
	    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
	  }

	  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
	    const specifiedLocale = locale || Settings.defaultLocale;
	    // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
	    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
	    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
	    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
	    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
	  }

	  static resetCache() {
	    sysLocaleCache = null;
	    intlDTCache = {};
	    intlNumCache = {};
	    intlRelCache = {};
	  }

	  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
	    return Locale.create(locale, numberingSystem, outputCalendar);
	  }

	  constructor(locale, numbering, outputCalendar, specifiedLocale) {
	    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);

	    this.locale = parsedLocale;
	    this.numberingSystem = numbering || parsedNumberingSystem || null;
	    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
	    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

	    this.weekdaysCache = { format: {}, standalone: {} };
	    this.monthsCache = { format: {}, standalone: {} };
	    this.meridiemCache = null;
	    this.eraCache = {};

	    this.specifiedLocale = specifiedLocale;
	    this.fastNumbersCached = null;
	  }

	  get fastNumbers() {
	    if (this.fastNumbersCached == null) {
	      this.fastNumbersCached = supportsFastNumbers(this);
	    }

	    return this.fastNumbersCached;
	  }

	  listingMode() {
	    const isActuallyEn = this.isEnglish();
	    const hasNoWeirdness =
	      (this.numberingSystem === null || this.numberingSystem === "latn") &&
	      (this.outputCalendar === null || this.outputCalendar === "gregory");
	    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
	  }

	  clone(alts) {
	    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
	      return this;
	    } else {
	      return Locale.create(
	        alts.locale || this.specifiedLocale,
	        alts.numberingSystem || this.numberingSystem,
	        alts.outputCalendar || this.outputCalendar,
	        alts.defaultToEN || false
	      );
	    }
	  }

	  redefaultToEN(alts = {}) {
	    return this.clone({ ...alts, defaultToEN: true });
	  }

	  redefaultToSystem(alts = {}) {
	    return this.clone({ ...alts, defaultToEN: false });
	  }

	  months(length, format = false) {
	    return listStuff(this, length, months, () => {
	      const intl = format ? { month: length, day: "numeric" } : { month: length },
	        formatStr = format ? "format" : "standalone";
	      if (!this.monthsCache[formatStr][length]) {
	        this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
	      }
	      return this.monthsCache[formatStr][length];
	    });
	  }

	  weekdays(length, format = false) {
	    return listStuff(this, length, weekdays, () => {
	      const intl = format
	          ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
	          : { weekday: length },
	        formatStr = format ? "format" : "standalone";
	      if (!this.weekdaysCache[formatStr][length]) {
	        this.weekdaysCache[formatStr][length] = mapWeekdays((dt) =>
	          this.extract(dt, intl, "weekday")
	        );
	      }
	      return this.weekdaysCache[formatStr][length];
	    });
	  }

	  meridiems() {
	    return listStuff(
	      this,
	      undefined,
	      () => meridiems,
	      () => {
	        // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
	        // for AM and PM. This is probably wrong, but it's makes parsing way easier.
	        if (!this.meridiemCache) {
	          const intl = { hour: "numeric", hourCycle: "h12" };
	          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
	            (dt) => this.extract(dt, intl, "dayperiod")
	          );
	        }

	        return this.meridiemCache;
	      }
	    );
	  }

	  eras(length) {
	    return listStuff(this, length, eras, () => {
	      const intl = { era: length };

	      // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
	      // to definitely enumerate them.
	      if (!this.eraCache[length]) {
	        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) =>
	          this.extract(dt, intl, "era")
	        );
	      }

	      return this.eraCache[length];
	    });
	  }

	  extract(dt, intlOpts, field) {
	    const df = this.dtFormatter(dt, intlOpts),
	      results = df.formatToParts(),
	      matching = results.find((m) => m.type.toLowerCase() === field);
	    return matching ? matching.value : null;
	  }

	  numberFormatter(opts = {}) {
	    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
	    // (in contrast, the rest of the condition is used heavily)
	    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
	  }

	  dtFormatter(dt, intlOpts = {}) {
	    return new PolyDateFormatter(dt, this.intl, intlOpts);
	  }

	  relFormatter(opts = {}) {
	    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
	  }

	  listFormatter(opts = {}) {
	    return getCachedLF(this.intl, opts);
	  }

	  isEnglish() {
	    return (
	      this.locale === "en" ||
	      this.locale.toLowerCase() === "en-us" ||
	      new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")
	    );
	  }

	  equals(other) {
	    return (
	      this.locale === other.locale &&
	      this.numberingSystem === other.numberingSystem &&
	      this.outputCalendar === other.outputCalendar
	    );
	  }
	}

	let singleton = null;

	/**
	 * A zone with a fixed offset (meaning no DST)
	 * @implements {Zone}
	 */
	class FixedOffsetZone extends Zone {
	  /**
	   * Get a singleton instance of UTC
	   * @return {FixedOffsetZone}
	   */
	  static get utcInstance() {
	    if (singleton === null) {
	      singleton = new FixedOffsetZone(0);
	    }
	    return singleton;
	  }

	  /**
	   * Get an instance with a specified offset
	   * @param {number} offset - The offset in minutes
	   * @return {FixedOffsetZone}
	   */
	  static instance(offset) {
	    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
	  }

	  /**
	   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
	   * @param {string} s - The offset string to parse
	   * @example FixedOffsetZone.parseSpecifier("UTC+6")
	   * @example FixedOffsetZone.parseSpecifier("UTC+06")
	   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
	   * @return {FixedOffsetZone}
	   */
	  static parseSpecifier(s) {
	    if (s) {
	      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
	      if (r) {
	        return new FixedOffsetZone(signedOffset(r[1], r[2]));
	      }
	    }
	    return null;
	  }

	  constructor(offset) {
	    super();
	    /** @private **/
	    this.fixed = offset;
	  }

	  /** @override **/
	  get type() {
	    return "fixed";
	  }

	  /** @override **/
	  get name() {
	    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
	  }

	  get ianaName() {
	    if (this.fixed === 0) {
	      return "Etc/UTC";
	    } else {
	      return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
	    }
	  }

	  /** @override **/
	  offsetName() {
	    return this.name;
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.fixed, format);
	  }

	  /** @override **/
	  get isUniversal() {
	    return true;
	  }

	  /** @override **/
	  offset() {
	    return this.fixed;
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	/**
	 * A zone that failed to parse. You should never need to instantiate this.
	 * @implements {Zone}
	 */
	class InvalidZone extends Zone {
	  constructor(zoneName) {
	    super();
	    /**  @private */
	    this.zoneName = zoneName;
	  }

	  /** @override **/
	  get type() {
	    return "invalid";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get isUniversal() {
	    return false;
	  }

	  /** @override **/
	  offsetName() {
	    return null;
	  }

	  /** @override **/
	  formatOffset() {
	    return "";
	  }

	  /** @override **/
	  offset() {
	    return NaN;
	  }

	  /** @override **/
	  equals() {
	    return false;
	  }

	  /** @override **/
	  get isValid() {
	    return false;
	  }
	}

	/**
	 * @private
	 */

	function normalizeZone(input, defaultZone) {
	  if (isUndefined(input) || input === null) {
	    return defaultZone;
	  } else if (input instanceof Zone) {
	    return input;
	  } else if (isString(input)) {
	    const lowered = input.toLowerCase();
	    if (lowered === "default") return defaultZone;
	    else if (lowered === "local" || lowered === "system") return SystemZone.instance;
	    else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
	    else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
	  } else if (isNumber(input)) {
	    return FixedOffsetZone.instance(input);
	  } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
	    // This is dumb, but the instanceof check above doesn't seem to really work
	    // so we're duck checking it
	    return input;
	  } else {
	    return new InvalidZone(input);
	  }
	}

	let now = () => Date.now(),
	  defaultZone = "system",
	  defaultLocale = null,
	  defaultNumberingSystem = null,
	  defaultOutputCalendar = null,
	  twoDigitCutoffYear = 60,
	  throwOnInvalid;

	/**
	 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
	 */
	class Settings {
	  /**
	   * Get the callback for returning the current timestamp.
	   * @type {function}
	   */
	  static get now() {
	    return now;
	  }

	  /**
	   * Set the callback for returning the current timestamp.
	   * The function should return a number, which will be interpreted as an Epoch millisecond count
	   * @type {function}
	   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
	   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
	   */
	  static set now(n) {
	    now = n;
	  }

	  /**
	   * Set the default time zone to create DateTimes in. Does not affect existing instances.
	   * Use the value "system" to reset this value to the system's time zone.
	   * @type {string}
	   */
	  static set defaultZone(zone) {
	    defaultZone = zone;
	  }

	  /**
	   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
	   * The default value is the system's time zone (the one set on the machine that runs this code).
	   * @type {Zone}
	   */
	  static get defaultZone() {
	    return normalizeZone(defaultZone, SystemZone.instance);
	  }

	  /**
	   * Get the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultLocale() {
	    return defaultLocale;
	  }

	  /**
	   * Set the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultLocale(locale) {
	    defaultLocale = locale;
	  }

	  /**
	   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultNumberingSystem() {
	    return defaultNumberingSystem;
	  }

	  /**
	   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultNumberingSystem(numberingSystem) {
	    defaultNumberingSystem = numberingSystem;
	  }

	  /**
	   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultOutputCalendar() {
	    return defaultOutputCalendar;
	  }

	  /**
	   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultOutputCalendar(outputCalendar) {
	    defaultOutputCalendar = outputCalendar;
	  }

	  /**
	   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
	   * @type {number}
	   */
	  static get twoDigitCutoffYear() {
	    return twoDigitCutoffYear;
	  }

	  /**
	   * Set the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
	   * @type {number}
	   * @example Settings.twoDigitCutoffYear = 0 // cut-off year is 0, so all 'yy' are interpreted as current century
	   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 1949; '50' -> 2050
	   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
	   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
	   */
	  static set twoDigitCutoffYear(cutoffYear) {
	    twoDigitCutoffYear = cutoffYear % 100;
	  }

	  /**
	   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static get throwOnInvalid() {
	    return throwOnInvalid;
	  }

	  /**
	   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static set throwOnInvalid(t) {
	    throwOnInvalid = t;
	  }

	  /**
	   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCaches() {
	    Locale.resetCache();
	    IANAZone.resetCache();
	  }
	}

	/*
	  This is just a junk drawer, containing anything used across multiple classes.
	  Because Luxon is small(ish), this should stay small and we won't worry about splitting
	  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
	*/

	/**
	 * @private
	 */

	// TYPES

	function isUndefined(o) {
	  return typeof o === "undefined";
	}

	function isNumber(o) {
	  return typeof o === "number";
	}

	function isInteger(o) {
	  return typeof o === "number" && o % 1 === 0;
	}

	function isString(o) {
	  return typeof o === "string";
	}

	function isDate(o) {
	  return Object.prototype.toString.call(o) === "[object Date]";
	}

	// CAPABILITIES

	function hasRelative() {
	  try {
	    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
	  } catch (e) {
	    return false;
	  }
	}

	// OBJECTS AND ARRAYS

	function maybeArray(thing) {
	  return Array.isArray(thing) ? thing : [thing];
	}

	function bestBy(arr, by, compare) {
	  if (arr.length === 0) {
	    return undefined;
	  }
	  return arr.reduce((best, next) => {
	    const pair = [by(next), next];
	    if (!best) {
	      return pair;
	    } else if (compare(best[0], pair[0]) === best[0]) {
	      return best;
	    } else {
	      return pair;
	    }
	  }, null)[1];
	}

	function pick(obj, keys) {
	  return keys.reduce((a, k) => {
	    a[k] = obj[k];
	    return a;
	  }, {});
	}

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	// NUMBERS AND STRINGS

	function integerBetween(thing, bottom, top) {
	  return isInteger(thing) && thing >= bottom && thing <= top;
	}

	// x % n but takes the sign of n instead of x
	function floorMod(x, n) {
	  return x - n * Math.floor(x / n);
	}

	function padStart(input, n = 2) {
	  const isNeg = input < 0;
	  let padded;
	  if (isNeg) {
	    padded = "-" + ("" + -input).padStart(n, "0");
	  } else {
	    padded = ("" + input).padStart(n, "0");
	  }
	  return padded;
	}

	function parseInteger(string) {
	  if (isUndefined(string) || string === null || string === "") {
	    return undefined;
	  } else {
	    return parseInt(string, 10);
	  }
	}

	function parseFloating(string) {
	  if (isUndefined(string) || string === null || string === "") {
	    return undefined;
	  } else {
	    return parseFloat(string);
	  }
	}

	function parseMillis(fraction) {
	  // Return undefined (instead of 0) in these cases, where fraction is not set
	  if (isUndefined(fraction) || fraction === null || fraction === "") {
	    return undefined;
	  } else {
	    const f = parseFloat("0." + fraction) * 1000;
	    return Math.floor(f);
	  }
	}

	function roundTo(number, digits, towardZero = false) {
	  const factor = 10 ** digits,
	    rounder = towardZero ? Math.trunc : Math.round;
	  return rounder(number * factor) / factor;
	}

	// DATE BASICS

	function isLeapYear(year) {
	  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	function daysInYear(year) {
	  return isLeapYear(year) ? 366 : 365;
	}

	function daysInMonth(year, month) {
	  const modMonth = floorMod(month - 1, 12) + 1,
	    modYear = year + (month - modMonth) / 12;

	  if (modMonth === 2) {
	    return isLeapYear(modYear) ? 29 : 28;
	  } else {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
	  }
	}

	// convert a calendar object to a local timestamp (epoch, but with the offset baked in)
	function objToLocalTS(obj) {
	  let d = Date.UTC(
	    obj.year,
	    obj.month - 1,
	    obj.day,
	    obj.hour,
	    obj.minute,
	    obj.second,
	    obj.millisecond
	  );

	  // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
	  if (obj.year < 100 && obj.year >= 0) {
	    d = new Date(d);
	    // set the month and day again, this is necessary because year 2000 is a leap year, but year 100 is not
	    // so if obj.year is in 99, but obj.day makes it roll over into year 100,
	    // the calculations done by Date.UTC are using year 2000 - which is incorrect
	    d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
	  }
	  return +d;
	}

	function weeksInWeekYear(weekYear) {
	  const p1 =
	      (weekYear +
	        Math.floor(weekYear / 4) -
	        Math.floor(weekYear / 100) +
	        Math.floor(weekYear / 400)) %
	      7,
	    last = weekYear - 1,
	    p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
	  return p1 === 4 || p2 === 3 ? 53 : 52;
	}

	function untruncateYear(year) {
	  if (year > 99) {
	    return year;
	  } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2000 + year;
	}

	// PARSING

	function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
	  const date = new Date(ts),
	    intlOpts = {
	      hourCycle: "h23",
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit",
	    };

	  if (timeZone) {
	    intlOpts.timeZone = timeZone;
	  }

	  const modified = { timeZoneName: offsetFormat, ...intlOpts };

	  const parsed = new Intl.DateTimeFormat(locale, modified)
	    .formatToParts(date)
	    .find((m) => m.type.toLowerCase() === "timezonename");
	  return parsed ? parsed.value : null;
	}

	// signedOffset('-5', '30') -> -330
	function signedOffset(offHourStr, offMinuteStr) {
	  let offHour = parseInt(offHourStr, 10);

	  // don't || this because we want to preserve -0
	  if (Number.isNaN(offHour)) {
	    offHour = 0;
	  }

	  const offMin = parseInt(offMinuteStr, 10) || 0,
	    offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
	  return offHour * 60 + offMinSigned;
	}

	// COERCION

	function asNumber(value) {
	  const numericValue = Number(value);
	  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
	    throw new InvalidArgumentError(`Invalid unit value ${value}`);
	  return numericValue;
	}

	function normalizeObject(obj, normalizer) {
	  const normalized = {};
	  for (const u in obj) {
	    if (hasOwnProperty(obj, u)) {
	      const v = obj[u];
	      if (v === undefined || v === null) continue;
	      normalized[normalizer(u)] = asNumber(v);
	    }
	  }
	  return normalized;
	}

	function formatOffset(offset, format) {
	  const hours = Math.trunc(Math.abs(offset / 60)),
	    minutes = Math.trunc(Math.abs(offset % 60)),
	    sign = offset >= 0 ? "+" : "-";

	  switch (format) {
	    case "short":
	      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
	    case "narrow":
	      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
	    case "techie":
	      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
	    default:
	      throw new RangeError(`Value format ${format} is out of range for property format`);
	  }
	}

	function timeObject(obj) {
	  return pick(obj, ["hour", "minute", "second", "millisecond"]);
	}

	/**
	 * @private
	 */

	const monthsLong = [
	  "January",
	  "February",
	  "March",
	  "April",
	  "May",
	  "June",
	  "July",
	  "August",
	  "September",
	  "October",
	  "November",
	  "December",
	];

	const monthsShort = [
	  "Jan",
	  "Feb",
	  "Mar",
	  "Apr",
	  "May",
	  "Jun",
	  "Jul",
	  "Aug",
	  "Sep",
	  "Oct",
	  "Nov",
	  "Dec",
	];

	const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

	function months(length) {
	  switch (length) {
	    case "narrow":
	      return [...monthsNarrow];
	    case "short":
	      return [...monthsShort];
	    case "long":
	      return [...monthsLong];
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	    case "2-digit":
	      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	    default:
	      return null;
	  }
	}

	const weekdaysLong = [
	  "Monday",
	  "Tuesday",
	  "Wednesday",
	  "Thursday",
	  "Friday",
	  "Saturday",
	  "Sunday",
	];

	const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];

	function weekdays(length) {
	  switch (length) {
	    case "narrow":
	      return [...weekdaysNarrow];
	    case "short":
	      return [...weekdaysShort];
	    case "long":
	      return [...weekdaysLong];
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7"];
	    default:
	      return null;
	  }
	}

	const meridiems = ["AM", "PM"];

	const erasLong = ["Before Christ", "Anno Domini"];

	const erasShort = ["BC", "AD"];

	const erasNarrow = ["B", "A"];

	function eras(length) {
	  switch (length) {
	    case "narrow":
	      return [...erasNarrow];
	    case "short":
	      return [...erasShort];
	    case "long":
	      return [...erasLong];
	    default:
	      return null;
	  }
	}

	function meridiemForDateTime(dt) {
	  return meridiems[dt.hour < 12 ? 0 : 1];
	}

	function weekdayForDateTime(dt, length) {
	  return weekdays(length)[dt.weekday - 1];
	}

	function monthForDateTime(dt, length) {
	  return months(length)[dt.month - 1];
	}

	function eraForDateTime(dt, length) {
	  return eras(length)[dt.year < 0 ? 0 : 1];
	}

	function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
	  const units = {
	    years: ["year", "yr."],
	    quarters: ["quarter", "qtr."],
	    months: ["month", "mo."],
	    weeks: ["week", "wk."],
	    days: ["day", "day", "days"],
	    hours: ["hour", "hr."],
	    minutes: ["minute", "min."],
	    seconds: ["second", "sec."],
	  };

	  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

	  if (numeric === "auto" && lastable) {
	    const isDay = unit === "days";
	    switch (count) {
	      case 1:
	        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
	      case -1:
	        return isDay ? "yesterday" : `last ${units[unit][0]}`;
	      case 0:
	        return isDay ? "today" : `this ${units[unit][0]}`;
	    }
	  }

	  const isInPast = Object.is(count, -0) || count < 0,
	    fmtValue = Math.abs(count),
	    singular = fmtValue === 1,
	    lilUnits = units[unit],
	    fmtUnit = narrow
	      ? singular
	        ? lilUnits[1]
	        : lilUnits[2] || lilUnits[1]
	      : singular
	      ? units[unit][0]
	      : unit;
	  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
	}

	function stringifyTokens(splits, tokenToString) {
	  let s = "";
	  for (const token of splits) {
	    if (token.literal) {
	      s += token.val;
	    } else {
	      s += tokenToString(token.val);
	    }
	  }
	  return s;
	}

	const macroTokenToFormatOpts = {
	  D: DATE_SHORT,
	  DD: DATE_MED,
	  DDD: DATE_FULL,
	  DDDD: DATE_HUGE,
	  t: TIME_SIMPLE,
	  tt: TIME_WITH_SECONDS,
	  ttt: TIME_WITH_SHORT_OFFSET,
	  tttt: TIME_WITH_LONG_OFFSET,
	  T: TIME_24_SIMPLE,
	  TT: TIME_24_WITH_SECONDS,
	  TTT: TIME_24_WITH_SHORT_OFFSET,
	  TTTT: TIME_24_WITH_LONG_OFFSET,
	  f: DATETIME_SHORT,
	  ff: DATETIME_MED,
	  fff: DATETIME_FULL,
	  ffff: DATETIME_HUGE,
	  F: DATETIME_SHORT_WITH_SECONDS,
	  FF: DATETIME_MED_WITH_SECONDS,
	  FFF: DATETIME_FULL_WITH_SECONDS,
	  FFFF: DATETIME_HUGE_WITH_SECONDS,
	};

	/**
	 * @private
	 */

	class Formatter {
	  static create(locale, opts = {}) {
	    return new Formatter(locale, opts);
	  }

	  static parseFormat(fmt) {
	    // white-space is always considered a literal in user-provided formats
	    // the " " token has a special meaning (see unitForToken)

	    let current = null,
	      currentFull = "",
	      bracketed = false;
	    const splits = [];
	    for (let i = 0; i < fmt.length; i++) {
	      const c = fmt.charAt(i);
	      if (c === "'") {
	        if (currentFull.length > 0) {
	          splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
	        }
	        current = null;
	        currentFull = "";
	        bracketed = !bracketed;
	      } else if (bracketed) {
	        currentFull += c;
	      } else if (c === current) {
	        currentFull += c;
	      } else {
	        if (currentFull.length > 0) {
	          splits.push({ literal: /^\s+$/.test(currentFull), val: currentFull });
	        }
	        currentFull = c;
	        current = c;
	      }
	    }

	    if (currentFull.length > 0) {
	      splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
	    }

	    return splits;
	  }

	  static macroTokenToFormatOpts(token) {
	    return macroTokenToFormatOpts[token];
	  }

	  constructor(locale, formatOpts) {
	    this.opts = formatOpts;
	    this.loc = locale;
	    this.systemLoc = null;
	  }

	  formatWithSystemDefault(dt, opts) {
	    if (this.systemLoc === null) {
	      this.systemLoc = this.loc.redefaultToSystem();
	    }
	    const df = this.systemLoc.dtFormatter(dt, { ...this.opts, ...opts });
	    return df.format();
	  }

	  dtFormatter(dt, opts = {}) {
	    return this.loc.dtFormatter(dt, { ...this.opts, ...opts });
	  }

	  formatDateTime(dt, opts) {
	    return this.dtFormatter(dt, opts).format();
	  }

	  formatDateTimeParts(dt, opts) {
	    return this.dtFormatter(dt, opts).formatToParts();
	  }

	  formatInterval(interval, opts) {
	    const df = this.dtFormatter(interval.start, opts);
	    return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
	  }

	  resolvedOptions(dt, opts) {
	    return this.dtFormatter(dt, opts).resolvedOptions();
	  }

	  num(n, p = 0) {
	    // we get some perf out of doing this here, annoyingly
	    if (this.opts.forceSimple) {
	      return padStart(n, p);
	    }

	    const opts = { ...this.opts };

	    if (p > 0) {
	      opts.padTo = p;
	    }

	    return this.loc.numberFormatter(opts).format(n);
	  }

	  formatDateTimeFromString(dt, fmt) {
	    const knownEnglish = this.loc.listingMode() === "en",
	      useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
	      string = (opts, extract) => this.loc.extract(dt, opts, extract),
	      formatOffset = (opts) => {
	        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
	          return "Z";
	        }

	        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
	      },
	      meridiem = () =>
	        knownEnglish
	          ? meridiemForDateTime(dt)
	          : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"),
	      month = (length, standalone) =>
	        knownEnglish
	          ? monthForDateTime(dt, length)
	          : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"),
	      weekday = (length, standalone) =>
	        knownEnglish
	          ? weekdayForDateTime(dt, length)
	          : string(
	              standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
	              "weekday"
	            ),
	      maybeMacro = (token) => {
	        const formatOpts = Formatter.macroTokenToFormatOpts(token);
	        if (formatOpts) {
	          return this.formatWithSystemDefault(dt, formatOpts);
	        } else {
	          return token;
	        }
	      },
	      era = (length) =>
	        knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"),
	      tokenToString = (token) => {
	        // Where possible: https://cldr.unicode.org/translation/date-time/date-time-symbols
	        switch (token) {
	          // ms
	          case "S":
	            return this.num(dt.millisecond);
	          case "u":
	          // falls through
	          case "SSS":
	            return this.num(dt.millisecond, 3);
	          // seconds
	          case "s":
	            return this.num(dt.second);
	          case "ss":
	            return this.num(dt.second, 2);
	          // fractional seconds
	          case "uu":
	            return this.num(Math.floor(dt.millisecond / 10), 2);
	          case "uuu":
	            return this.num(Math.floor(dt.millisecond / 100));
	          // minutes
	          case "m":
	            return this.num(dt.minute);
	          case "mm":
	            return this.num(dt.minute, 2);
	          // hours
	          case "h":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
	          case "hh":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
	          case "H":
	            return this.num(dt.hour);
	          case "HH":
	            return this.num(dt.hour, 2);
	          // offset
	          case "Z":
	            // like +6
	            return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
	          case "ZZ":
	            // like +06:00
	            return formatOffset({ format: "short", allowZ: this.opts.allowZ });
	          case "ZZZ":
	            // like +0600
	            return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
	          case "ZZZZ":
	            // like EST
	            return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
	          case "ZZZZZ":
	            // like Eastern Standard Time
	            return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
	          // zone
	          case "z":
	            // like America/New_York
	            return dt.zoneName;
	          // meridiems
	          case "a":
	            return meridiem();
	          // dates
	          case "d":
	            return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
	          case "dd":
	            return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
	          // weekdays - standalone
	          case "c":
	            // like 1
	            return this.num(dt.weekday);
	          case "ccc":
	            // like 'Tues'
	            return weekday("short", true);
	          case "cccc":
	            // like 'Tuesday'
	            return weekday("long", true);
	          case "ccccc":
	            // like 'T'
	            return weekday("narrow", true);
	          // weekdays - format
	          case "E":
	            // like 1
	            return this.num(dt.weekday);
	          case "EEE":
	            // like 'Tues'
	            return weekday("short", false);
	          case "EEEE":
	            // like 'Tuesday'
	            return weekday("long", false);
	          case "EEEEE":
	            // like 'T'
	            return weekday("narrow", false);
	          // months - standalone
	          case "L":
	            // like 1
	            return useDateTimeFormatter
	              ? string({ month: "numeric", day: "numeric" }, "month")
	              : this.num(dt.month);
	          case "LL":
	            // like 01, doesn't seem to work
	            return useDateTimeFormatter
	              ? string({ month: "2-digit", day: "numeric" }, "month")
	              : this.num(dt.month, 2);
	          case "LLL":
	            // like Jan
	            return month("short", true);
	          case "LLLL":
	            // like January
	            return month("long", true);
	          case "LLLLL":
	            // like J
	            return month("narrow", true);
	          // months - format
	          case "M":
	            // like 1
	            return useDateTimeFormatter
	              ? string({ month: "numeric" }, "month")
	              : this.num(dt.month);
	          case "MM":
	            // like 01
	            return useDateTimeFormatter
	              ? string({ month: "2-digit" }, "month")
	              : this.num(dt.month, 2);
	          case "MMM":
	            // like Jan
	            return month("short", false);
	          case "MMMM":
	            // like January
	            return month("long", false);
	          case "MMMMM":
	            // like J
	            return month("narrow", false);
	          // years
	          case "y":
	            // like 2014
	            return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
	          case "yy":
	            // like 14
	            return useDateTimeFormatter
	              ? string({ year: "2-digit" }, "year")
	              : this.num(dt.year.toString().slice(-2), 2);
	          case "yyyy":
	            // like 0012
	            return useDateTimeFormatter
	              ? string({ year: "numeric" }, "year")
	              : this.num(dt.year, 4);
	          case "yyyyyy":
	            // like 000012
	            return useDateTimeFormatter
	              ? string({ year: "numeric" }, "year")
	              : this.num(dt.year, 6);
	          // eras
	          case "G":
	            // like AD
	            return era("short");
	          case "GG":
	            // like Anno Domini
	            return era("long");
	          case "GGGGG":
	            return era("narrow");
	          case "kk":
	            return this.num(dt.weekYear.toString().slice(-2), 2);
	          case "kkkk":
	            return this.num(dt.weekYear, 4);
	          case "W":
	            return this.num(dt.weekNumber);
	          case "WW":
	            return this.num(dt.weekNumber, 2);
	          case "o":
	            return this.num(dt.ordinal);
	          case "ooo":
	            return this.num(dt.ordinal, 3);
	          case "q":
	            // like 1
	            return this.num(dt.quarter);
	          case "qq":
	            // like 01
	            return this.num(dt.quarter, 2);
	          case "X":
	            return this.num(Math.floor(dt.ts / 1000));
	          case "x":
	            return this.num(dt.ts);
	          default:
	            return maybeMacro(token);
	        }
	      };

	    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
	  }

	  formatDurationFromString(dur, fmt) {
	    const tokenToField = (token) => {
	        switch (token[0]) {
	          case "S":
	            return "millisecond";
	          case "s":
	            return "second";
	          case "m":
	            return "minute";
	          case "h":
	            return "hour";
	          case "d":
	            return "day";
	          case "w":
	            return "week";
	          case "M":
	            return "month";
	          case "y":
	            return "year";
	          default:
	            return null;
	        }
	      },
	      tokenToString = (lildur) => (token) => {
	        const mapped = tokenToField(token);
	        if (mapped) {
	          return this.num(lildur.get(mapped), token.length);
	        } else {
	          return token;
	        }
	      },
	      tokens = Formatter.parseFormat(fmt),
	      realTokens = tokens.reduce(
	        (found, { literal, val }) => (literal ? found : found.concat(val)),
	        []
	      ),
	      collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t));
	    return stringifyTokens(tokens, tokenToString(collapsed));
	  }
	}

	class Invalid {
	  constructor(reason, explanation) {
	    this.reason = reason;
	    this.explanation = explanation;
	  }

	  toMessage() {
	    if (this.explanation) {
	      return `${this.reason}: ${this.explanation}`;
	    } else {
	      return this.reason;
	    }
	  }
	}

	/*
	 * This file handles parsing for well-specified formats. Here's how it works:
	 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
	 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
	 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
	 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
	 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
	 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
	 */

	const ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;

	function combineRegexes(...regexes) {
	  const full = regexes.reduce((f, r) => f + r.source, "");
	  return RegExp(`^${full}$`);
	}

	function combineExtractors(...extractors) {
	  return (m) =>
	    extractors
	      .reduce(
	        ([mergedVals, mergedZone, cursor], ex) => {
	          const [val, zone, next] = ex(m, cursor);
	          return [{ ...mergedVals, ...val }, zone || mergedZone, next];
	        },
	        [{}, null, 1]
	      )
	      .slice(0, 2);
	}

	function parse(s, ...patterns) {
	  if (s == null) {
	    return [null, null];
	  }

	  for (const [regex, extractor] of patterns) {
	    const m = regex.exec(s);
	    if (m) {
	      return extractor(m);
	    }
	  }
	  return [null, null];
	}

	function simpleParse(...keys) {
	  return (match, cursor) => {
	    const ret = {};
	    let i;

	    for (i = 0; i < keys.length; i++) {
	      ret[keys[i]] = parseInteger(match[cursor + i]);
	    }
	    return [ret, null, cursor + i];
	  };
	}

	// ISO and SQL parsing
	const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
	const isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
	const isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
	const isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
	const isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
	const isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
	const isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
	const isoOrdinalRegex = /(\d{4})-?(\d{3})/;
	const extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
	const extractISOOrdinalData = simpleParse("year", "ordinal");
	const sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/; // dumbed-down version of the ISO one
	const sqlTimeRegex = RegExp(
	  `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
	);
	const sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

	function int(match, pos, fallback) {
	  const m = match[pos];
	  return isUndefined(m) ? fallback : parseInteger(m);
	}

	function extractISOYmd(match, cursor) {
	  const item = {
	    year: int(match, cursor),
	    month: int(match, cursor + 1, 1),
	    day: int(match, cursor + 2, 1),
	  };

	  return [item, null, cursor + 3];
	}

	function extractISOTime(match, cursor) {
	  const item = {
	    hours: int(match, cursor, 0),
	    minutes: int(match, cursor + 1, 0),
	    seconds: int(match, cursor + 2, 0),
	    milliseconds: parseMillis(match[cursor + 3]),
	  };

	  return [item, null, cursor + 4];
	}

	function extractISOOffset(match, cursor) {
	  const local = !match[cursor] && !match[cursor + 1],
	    fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
	    zone = local ? null : FixedOffsetZone.instance(fullOffset);
	  return [{}, zone, cursor + 3];
	}

	function extractIANAZone(match, cursor) {
	  const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
	  return [{}, zone, cursor + 1];
	}

	// ISO time parsing

	const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);

	// ISO duration parsing

	const isoDuration =
	  /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;

	function extractISODuration(match) {
	  const [s, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] =
	    match;

	  const hasNegativePrefix = s[0] === "-";
	  const negativeSeconds = secondStr && secondStr[0] === "-";

	  const maybeNegate = (num, force = false) =>
	    num !== undefined && (force || (num && hasNegativePrefix)) ? -num : num;

	  return [
	    {
	      years: maybeNegate(parseFloating(yearStr)),
	      months: maybeNegate(parseFloating(monthStr)),
	      weeks: maybeNegate(parseFloating(weekStr)),
	      days: maybeNegate(parseFloating(dayStr)),
	      hours: maybeNegate(parseFloating(hourStr)),
	      minutes: maybeNegate(parseFloating(minuteStr)),
	      seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
	      milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds),
	    },
	  ];
	}

	// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
	// and not just that we're in -240 *right now*. But since I don't think these are used that often
	// I'm just going to ignore that
	const obsOffsets = {
	  GMT: 0,
	  EDT: -4 * 60,
	  EST: -5 * 60,
	  CDT: -5 * 60,
	  CST: -6 * 60,
	  MDT: -6 * 60,
	  MST: -7 * 60,
	  PDT: -7 * 60,
	  PST: -8 * 60,
	};

	function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
	  const result = {
	    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
	    month: monthsShort.indexOf(monthStr) + 1,
	    day: parseInteger(dayStr),
	    hour: parseInteger(hourStr),
	    minute: parseInteger(minuteStr),
	  };

	  if (secondStr) result.second = parseInteger(secondStr);
	  if (weekdayStr) {
	    result.weekday =
	      weekdayStr.length > 3
	        ? weekdaysLong.indexOf(weekdayStr) + 1
	        : weekdaysShort.indexOf(weekdayStr) + 1;
	  }

	  return result;
	}

	// RFC 2822/5322
	const rfc2822 =
	  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

	function extractRFC2822(match) {
	  const [
	      ,
	      weekdayStr,
	      dayStr,
	      monthStr,
	      yearStr,
	      hourStr,
	      minuteStr,
	      secondStr,
	      obsOffset,
	      milOffset,
	      offHourStr,
	      offMinuteStr,
	    ] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

	  let offset;
	  if (obsOffset) {
	    offset = obsOffsets[obsOffset];
	  } else if (milOffset) {
	    offset = 0;
	  } else {
	    offset = signedOffset(offHourStr, offMinuteStr);
	  }

	  return [result, new FixedOffsetZone(offset)];
	}

	function preprocessRFC2822(s) {
	  // Remove comments and folding whitespace and replace multiple-spaces with a single space
	  return s
	    .replace(/\([^()]*\)|[\n\t]/g, " ")
	    .replace(/(\s\s+)/g, " ")
	    .trim();
	}

	// http date

	const rfc1123 =
	    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
	  rfc850 =
	    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
	  ascii =
	    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

	function extractRFC1123Or850(match) {
	  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}

	function extractASCII(match) {
	  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}

	const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
	const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
	const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
	const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);

	const extractISOYmdTimeAndOffset = combineExtractors(
	  extractISOYmd,
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);
	const extractISOWeekTimeAndOffset = combineExtractors(
	  extractISOWeekData,
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);
	const extractISOOrdinalDateAndTime = combineExtractors(
	  extractISOOrdinalData,
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);
	const extractISOTimeAndOffset = combineExtractors(
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);

	/*
	 * @private
	 */

	function parseISODate(s) {
	  return parse(
	    s,
	    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
	    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
	    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime],
	    [isoTimeCombinedRegex, extractISOTimeAndOffset]
	  );
	}

	function parseRFC2822Date(s) {
	  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
	}

	function parseHTTPDate(s) {
	  return parse(
	    s,
	    [rfc1123, extractRFC1123Or850],
	    [rfc850, extractRFC1123Or850],
	    [ascii, extractASCII]
	  );
	}

	function parseISODuration(s) {
	  return parse(s, [isoDuration, extractISODuration]);
	}

	const extractISOTimeOnly = combineExtractors(extractISOTime);

	function parseISOTimeOnly(s) {
	  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
	}

	const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
	const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);

	const extractISOTimeOffsetAndIANAZone = combineExtractors(
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);

	function parseSQL(s) {
	  return parse(
	    s,
	    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
	    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
	  );
	}

	const INVALID$2 = "Invalid Duration";

	// unit conversion constants
	const lowOrderMatrix = {
	    weeks: {
	      days: 7,
	      hours: 7 * 24,
	      minutes: 7 * 24 * 60,
	      seconds: 7 * 24 * 60 * 60,
	      milliseconds: 7 * 24 * 60 * 60 * 1000,
	    },
	    days: {
	      hours: 24,
	      minutes: 24 * 60,
	      seconds: 24 * 60 * 60,
	      milliseconds: 24 * 60 * 60 * 1000,
	    },
	    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
	    minutes: { seconds: 60, milliseconds: 60 * 1000 },
	    seconds: { milliseconds: 1000 },
	  },
	  casualMatrix = {
	    years: {
	      quarters: 4,
	      months: 12,
	      weeks: 52,
	      days: 365,
	      hours: 365 * 24,
	      minutes: 365 * 24 * 60,
	      seconds: 365 * 24 * 60 * 60,
	      milliseconds: 365 * 24 * 60 * 60 * 1000,
	    },
	    quarters: {
	      months: 3,
	      weeks: 13,
	      days: 91,
	      hours: 91 * 24,
	      minutes: 91 * 24 * 60,
	      seconds: 91 * 24 * 60 * 60,
	      milliseconds: 91 * 24 * 60 * 60 * 1000,
	    },
	    months: {
	      weeks: 4,
	      days: 30,
	      hours: 30 * 24,
	      minutes: 30 * 24 * 60,
	      seconds: 30 * 24 * 60 * 60,
	      milliseconds: 30 * 24 * 60 * 60 * 1000,
	    },

	    ...lowOrderMatrix,
	  },
	  daysInYearAccurate = 146097.0 / 400,
	  daysInMonthAccurate = 146097.0 / 4800,
	  accurateMatrix = {
	    years: {
	      quarters: 4,
	      months: 12,
	      weeks: daysInYearAccurate / 7,
	      days: daysInYearAccurate,
	      hours: daysInYearAccurate * 24,
	      minutes: daysInYearAccurate * 24 * 60,
	      seconds: daysInYearAccurate * 24 * 60 * 60,
	      milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000,
	    },
	    quarters: {
	      months: 3,
	      weeks: daysInYearAccurate / 28,
	      days: daysInYearAccurate / 4,
	      hours: (daysInYearAccurate * 24) / 4,
	      minutes: (daysInYearAccurate * 24 * 60) / 4,
	      seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
	      milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4,
	    },
	    months: {
	      weeks: daysInMonthAccurate / 7,
	      days: daysInMonthAccurate,
	      hours: daysInMonthAccurate * 24,
	      minutes: daysInMonthAccurate * 24 * 60,
	      seconds: daysInMonthAccurate * 24 * 60 * 60,
	      milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000,
	    },
	    ...lowOrderMatrix,
	  };

	// units ordered by size
	const orderedUnits$1 = [
	  "years",
	  "quarters",
	  "months",
	  "weeks",
	  "days",
	  "hours",
	  "minutes",
	  "seconds",
	  "milliseconds",
	];

	const reverseUnits = orderedUnits$1.slice(0).reverse();

	// clone really means "create another instance just like this one, but with these changes"
	function clone$1(dur, alts, clear = false) {
	  // deep merge for vals
	  const conf = {
	    values: clear ? alts.values : { ...dur.values, ...(alts.values || {}) },
	    loc: dur.loc.clone(alts.loc),
	    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
	    matrix: alts.matrix || dur.matrix,
	  };
	  return new Duration(conf);
	}

	function durationToMillis(matrix, vals) {
	  let sum = vals.milliseconds ?? 0;
	  for (const unit of reverseUnits.slice(1)) {
	    if (vals[unit]) {
	      sum += vals[unit] * matrix[unit]["milliseconds"];
	    }
	  }
	  return sum;
	}

	// NB: mutates parameters
	function normalizeValues(matrix, vals) {
	  // the logic below assumes the overall value of the duration is positive
	  // if this is not the case, factor is used to make it so
	  const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;

	  orderedUnits$1.reduceRight((previous, current) => {
	    if (!isUndefined(vals[current])) {
	      if (previous) {
	        const previousVal = vals[previous] * factor;
	        const conv = matrix[current][previous];

	        // if (previousVal < 0):
	        // lower order unit is negative (e.g. { years: 2, days: -2 })
	        // normalize this by reducing the higher order unit by the appropriate amount
	        // and increasing the lower order unit
	        // this can never make the higher order unit negative, because this function only operates
	        // on positive durations, so the amount of time represented by the lower order unit cannot
	        // be larger than the higher order unit
	        // else:
	        // lower order unit is positive (e.g. { years: 2, days: 450 } or { years: -2, days: 450 })
	        // in this case we attempt to convert as much as possible from the lower order unit into
	        // the higher order one
	        //
	        // Math.floor takes care of both of these cases, rounding away from 0
	        // if previousVal < 0 it makes the absolute value larger
	        // if previousVal >= it makes the absolute value smaller
	        const rollUp = Math.floor(previousVal / conv);
	        vals[current] += rollUp * factor;
	        vals[previous] -= rollUp * conv * factor;
	      }
	      return current;
	    } else {
	      return previous;
	    }
	  }, null);

	  // try to convert any decimals into smaller units if possible
	  // for example for { years: 2.5, days: 0, seconds: 0 } we want to get { years: 2, days: 182, hours: 12 }
	  orderedUnits$1.reduce((previous, current) => {
	    if (!isUndefined(vals[current])) {
	      if (previous) {
	        const fraction = vals[previous] % 1;
	        vals[previous] -= fraction;
	        vals[current] += fraction * matrix[previous][current];
	      }
	      return current;
	    } else {
	      return previous;
	    }
	  }, null);
	}

	// Remove all properties with a value of 0 from an object
	function removeZeroes(vals) {
	  const newVals = {};
	  for (const [key, value] of Object.entries(vals)) {
	    if (value !== 0) {
	      newVals[key] = value;
	    }
	  }
	  return newVals;
	}

	/**
	 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime#plus} to add a Duration object to a DateTime, producing another DateTime.
	 *
	 * Here is a brief overview of commonly used methods and getters in Duration:
	 *
	 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
	 * * **Unit values** See the {@link Duration#years}, {@link Duration#months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
	 * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
	 * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
	 * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
	 *
	 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
	 */
	class Duration {
	  /**
	   * @private
	   */
	  constructor(config) {
	    const accurate = config.conversionAccuracy === "longterm" || false;
	    let matrix = accurate ? accurateMatrix : casualMatrix;

	    if (config.matrix) {
	      matrix = config.matrix;
	    }

	    /**
	     * @access private
	     */
	    this.values = config.values;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.conversionAccuracy = accurate ? "longterm" : "casual";
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.matrix = matrix;
	    /**
	     * @access private
	     */
	    this.isLuxonDuration = true;
	  }

	  /**
	   * Create Duration from a number of milliseconds.
	   * @param {number} count of milliseconds
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  static fromMillis(count, opts) {
	    return Duration.fromObject({ milliseconds: count }, opts);
	  }

	  /**
	   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
	   * If this object is empty then a zero milliseconds duration is returned.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.years
	   * @param {number} obj.quarters
	   * @param {number} obj.months
	   * @param {number} obj.weeks
	   * @param {number} obj.days
	   * @param {number} obj.hours
	   * @param {number} obj.minutes
	   * @param {number} obj.seconds
	   * @param {number} obj.milliseconds
	   * @param {Object} [opts=[]] - options for creating this Duration
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
	   * @param {string} [opts.matrix=Object] - the custom conversion system to use
	   * @return {Duration}
	   */
	  static fromObject(obj, opts = {}) {
	    if (obj == null || typeof obj !== "object") {
	      throw new InvalidArgumentError(
	        `Duration.fromObject: argument expected to be an object, got ${
	          obj === null ? "null" : typeof obj
	        }`
	      );
	    }

	    return new Duration({
	      values: normalizeObject(obj, Duration.normalizeUnit),
	      loc: Locale.fromObject(opts),
	      conversionAccuracy: opts.conversionAccuracy,
	      matrix: opts.matrix,
	    });
	  }

	  /**
	   * Create a Duration from DurationLike.
	   *
	   * @param {Object | number | Duration} durationLike
	   * One of:
	   * - object with keys like 'years' and 'hours'.
	   * - number representing milliseconds
	   * - Duration instance
	   * @return {Duration}
	   */
	  static fromDurationLike(durationLike) {
	    if (isNumber(durationLike)) {
	      return Duration.fromMillis(durationLike);
	    } else if (Duration.isDuration(durationLike)) {
	      return durationLike;
	    } else if (typeof durationLike === "object") {
	      return Duration.fromObject(durationLike);
	    } else {
	      throw new InvalidArgumentError(
	        `Unknown duration argument ${durationLike} of type ${typeof durationLike}`
	      );
	    }
	  }

	  /**
	   * Create a Duration from an ISO 8601 duration string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
	   * @param {string} [opts.matrix=Object] - the preset conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
	   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
	   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
	   * @return {Duration}
	   */
	  static fromISO(text, opts) {
	    const [parsed] = parseISODuration(text);
	    if (parsed) {
	      return Duration.fromObject(parsed, opts);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create a Duration from an ISO 8601 time string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
	   * @param {string} [opts.matrix=Object] - the conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
	   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
	   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @return {Duration}
	   */
	  static fromISOTime(text, opts) {
	    const [parsed] = parseISOTimeOnly(text);
	    if (parsed) {
	      return Duration.fromObject(parsed, opts);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create an invalid Duration.
	   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Duration}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidDurationError(invalid);
	    } else {
	      return new Duration({ invalid });
	    }
	  }

	  /**
	   * @private
	   */
	  static normalizeUnit(unit) {
	    const normalized = {
	      year: "years",
	      years: "years",
	      quarter: "quarters",
	      quarters: "quarters",
	      month: "months",
	      months: "months",
	      week: "weeks",
	      weeks: "weeks",
	      day: "days",
	      days: "days",
	      hour: "hours",
	      hours: "hours",
	      minute: "minutes",
	      minutes: "minutes",
	      second: "seconds",
	      seconds: "seconds",
	      millisecond: "milliseconds",
	      milliseconds: "milliseconds",
	    }[unit ? unit.toLowerCase() : unit];

	    if (!normalized) throw new InvalidUnitError(unit);

	    return normalized;
	  }

	  /**
	   * Check if an object is a Duration. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDuration(o) {
	    return (o && o.isLuxonDuration) || false;
	  }

	  /**
	   * Get  the locale of a Duration, such 'en-GB'
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
	   * * `S` for milliseconds
	   * * `s` for seconds
	   * * `m` for minutes
	   * * `h` for hours
	   * * `d` for days
	   * * `w` for weeks
	   * * `M` for months
	   * * `y` for years
	   * Notes:
	   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
	   * * Tokens can be escaped by wrapping with single quotes.
	   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
	   * @param {string} fmt - the format string
	   * @param {Object} opts - options
	   * @param {boolean} [opts.floor=true] - floor numerical values
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
	    const fmtOpts = {
	      ...opts,
	      floor: opts.round !== false && opts.floor !== false,
	    };
	    return this.isValid
	      ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
	      : INVALID$2;
	  }

	  /**
	   * Returns a string representation of a Duration with all units included.
	   * To modify its behavior use the `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	   * @param opts - On option object to override the formatting. Accepts the same keys as the options parameter of the native `Int.NumberFormat` constructor, as well as `listStyle`.
	   * @example
	   * ```js
	   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
	   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
	   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
	   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
	   * ```
	   */
	  toHuman(opts = {}) {
	    if (!this.isValid) return INVALID$2;

	    const l = orderedUnits$1
	      .map((unit) => {
	        const val = this.values[unit];
	        if (isUndefined(val)) {
	          return null;
	        }
	        return this.loc
	          .numberFormatter({ style: "unit", unitDisplay: "long", ...opts, unit: unit.slice(0, -1) })
	          .format(val);
	      })
	      .filter((n) => n);

	    return this.loc
	      .listFormatter({ type: "conjunction", style: opts.listStyle || "narrow", ...opts })
	      .format(l);
	  }

	  /**
	   * Returns a JavaScript object with this Duration's values.
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
	   * @return {Object}
	   */
	  toObject() {
	    if (!this.isValid) return {};
	    return { ...this.values };
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
	   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
	   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
	   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
	   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
	   * @return {string}
	   */
	  toISO() {
	    // we could use the formatter, but this is an easier way to get the minimum string
	    if (!this.isValid) return null;

	    let s = "P";
	    if (this.years !== 0) s += this.years + "Y";
	    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
	    if (this.weeks !== 0) s += this.weeks + "W";
	    if (this.days !== 0) s += this.days + "D";
	    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
	      s += "T";
	    if (this.hours !== 0) s += this.hours + "H";
	    if (this.minutes !== 0) s += this.minutes + "M";
	    if (this.seconds !== 0 || this.milliseconds !== 0)
	      // this will handle "floating point madness" by removing extra decimal places
	      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
	      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
	    if (s === "P") s += "T0S";
	    return s;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
	   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
	   * @return {string}
	   */
	  toISOTime(opts = {}) {
	    if (!this.isValid) return null;

	    const millis = this.toMillis();
	    if (millis < 0 || millis >= 86400000) return null;

	    opts = {
	      suppressMilliseconds: false,
	      suppressSeconds: false,
	      includePrefix: false,
	      format: "extended",
	      ...opts,
	      includeOffset: false,
	    };

	    const dateTime = DateTime.fromMillis(millis, { zone: "UTC" });
	    return dateTime.toISOTime(opts);
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
	   * @return {string}
	   */
	  toString() {
	    return this.toISO();
	  }

	  /**
	   * Returns an milliseconds value of this Duration.
	   * @return {number}
	   */
	  toMillis() {
	    if (!this.isValid) return NaN;

	    return durationToMillis(this.matrix, this.values);
	  }

	  /**
	   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;

	    const dur = Duration.fromDurationLike(duration),
	      result = {};

	    for (const k of orderedUnits$1) {
	      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
	        result[k] = dur.get(k) + this.get(k);
	      }
	    }

	    return clone$1(this, { values: result }, true);
	  }

	  /**
	   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  minus(duration) {
	    if (!this.isValid) return this;

	    const dur = Duration.fromDurationLike(duration);
	    return this.plus(dur.negate());
	  }

	  /**
	   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
	   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
	   * @return {Duration}
	   */
	  mapUnits(fn) {
	    if (!this.isValid) return this;
	    const result = {};
	    for (const k of Object.keys(this.values)) {
	      result[k] = asNumber(fn(this.values[k], k));
	    }
	    return clone$1(this, { values: result }, true);
	  }

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
	   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
	   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
	   * @return {number}
	   */
	  get(unit) {
	    return this[Duration.normalizeUnit(unit)];
	  }

	  /**
	   * "Set" the values of specified units. Return a newly-constructed Duration.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dur.set({ years: 2017 })
	   * @example dur.set({ hours: 8, minutes: 30 })
	   * @return {Duration}
	   */
	  set(values) {
	    if (!this.isValid) return this;

	    const mixed = { ...this.values, ...normalizeObject(values, Duration.normalizeUnit) };
	    return clone$1(this, { values: mixed });
	  }

	  /**
	   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
	   * @example dur.reconfigure({ locale: 'en-GB' })
	   * @return {Duration}
	   */
	  reconfigure({ locale, numberingSystem, conversionAccuracy, matrix } = {}) {
	    const loc = this.loc.clone({ locale, numberingSystem });
	    const opts = { loc, matrix, conversionAccuracy };
	    return clone$1(this, opts);
	  }

	  /**
	   * Return the length of the duration in the specified unit.
	   * @param {string} unit - a unit such as 'minutes' or 'days'
	   * @example Duration.fromObject({years: 1}).as('days') //=> 365
	   * @example Duration.fromObject({years: 1}).as('months') //=> 12
	   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
	   * @return {number}
	   */
	  as(unit) {
	    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
	  }

	  /**
	   * Reduce this Duration to its canonical representation in its current units.
	   * Assuming the overall value of the Duration is positive, this means:
	   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
	   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
	   *   the overall value would be negative, see second example)
	   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
	   *
	   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
	   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
	   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
	   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
	   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
	   * @return {Duration}
	   */
	  normalize() {
	    if (!this.isValid) return this;
	    const vals = this.toObject();
	    normalizeValues(this.matrix, vals);
	    return clone$1(this, { values: vals }, true);
	  }

	  /**
	   * Rescale units to its largest representation
	   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
	   * @return {Duration}
	   */
	  rescale() {
	    if (!this.isValid) return this;
	    const vals = removeZeroes(this.normalize().shiftToAll().toObject());
	    return clone$1(this, { values: vals }, true);
	  }

	  /**
	   * Convert this Duration into its representation in a different set of units.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
	   * @return {Duration}
	   */
	  shiftTo(...units) {
	    if (!this.isValid) return this;

	    if (units.length === 0) {
	      return this;
	    }

	    units = units.map((u) => Duration.normalizeUnit(u));

	    const built = {},
	      accumulated = {},
	      vals = this.toObject();
	    let lastUnit;

	    for (const k of orderedUnits$1) {
	      if (units.indexOf(k) >= 0) {
	        lastUnit = k;

	        let own = 0;

	        // anything we haven't boiled down yet should get boiled to this unit
	        for (const ak in accumulated) {
	          own += this.matrix[ak][k] * accumulated[ak];
	          accumulated[ak] = 0;
	        }

	        // plus anything that's already in this unit
	        if (isNumber(vals[k])) {
	          own += vals[k];
	        }

	        // only keep the integer part for now in the hopes of putting any decimal part
	        // into a smaller unit later
	        const i = Math.trunc(own);
	        built[k] = i;
	        accumulated[k] = (own * 1000 - i * 1000) / 1000;

	        // otherwise, keep it in the wings to boil it later
	      } else if (isNumber(vals[k])) {
	        accumulated[k] = vals[k];
	      }
	    }

	    // anything leftover becomes the decimal for the last unit
	    // lastUnit must be defined since units is not empty
	    for (const key in accumulated) {
	      if (accumulated[key] !== 0) {
	        built[lastUnit] +=
	          key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
	      }
	    }

	    normalizeValues(this.matrix, built);
	    return clone$1(this, { values: built }, true);
	  }

	  /**
	   * Shift this Duration to all available units.
	   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
	   * @return {Duration}
	   */
	  shiftToAll() {
	    if (!this.isValid) return this;
	    return this.shiftTo(
	      "years",
	      "months",
	      "weeks",
	      "days",
	      "hours",
	      "minutes",
	      "seconds",
	      "milliseconds"
	    );
	  }

	  /**
	   * Return the negative of this Duration.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
	   * @return {Duration}
	   */
	  negate() {
	    if (!this.isValid) return this;
	    const negated = {};
	    for (const k of Object.keys(this.values)) {
	      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
	    }
	    return clone$1(this, { values: negated }, true);
	  }

	  /**
	   * Get the years.
	   * @type {number}
	   */
	  get years() {
	    return this.isValid ? this.values.years || 0 : NaN;
	  }

	  /**
	   * Get the quarters.
	   * @type {number}
	   */
	  get quarters() {
	    return this.isValid ? this.values.quarters || 0 : NaN;
	  }

	  /**
	   * Get the months.
	   * @type {number}
	   */
	  get months() {
	    return this.isValid ? this.values.months || 0 : NaN;
	  }

	  /**
	   * Get the weeks
	   * @type {number}
	   */
	  get weeks() {
	    return this.isValid ? this.values.weeks || 0 : NaN;
	  }

	  /**
	   * Get the days.
	   * @type {number}
	   */
	  get days() {
	    return this.isValid ? this.values.days || 0 : NaN;
	  }

	  /**
	   * Get the hours.
	   * @type {number}
	   */
	  get hours() {
	    return this.isValid ? this.values.hours || 0 : NaN;
	  }

	  /**
	   * Get the minutes.
	   * @type {number}
	   */
	  get minutes() {
	    return this.isValid ? this.values.minutes || 0 : NaN;
	  }

	  /**
	   * Get the seconds.
	   * @return {number}
	   */
	  get seconds() {
	    return this.isValid ? this.values.seconds || 0 : NaN;
	  }

	  /**
	   * Get the milliseconds.
	   * @return {number}
	   */
	  get milliseconds() {
	    return this.isValid ? this.values.milliseconds || 0 : NaN;
	  }

	  /**
	   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
	   * on invalid DateTimes or Intervals.
	   * @return {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this Duration became invalid, or null if the Duration is valid
	   * @return {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Equality check
	   * Two Durations are equal iff they have the same units and the same values for each unit.
	   * @param {Duration} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }

	    if (!this.loc.equals(other.loc)) {
	      return false;
	    }

	    function eq(v1, v2) {
	      // Consider 0 and undefined as equal
	      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
	      return v1 === v2;
	    }

	    for (const u of orderedUnits$1) {
	      if (!eq(this.values[u], other.values[u])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	const INVALID$1 = "Invalid Interval";

	// checks if the start is equal to or before the end
	function validateStartEnd(start, end) {
	  if (!start || !start.isValid) {
	    return Interval.invalid("missing or invalid start");
	  } else if (!end || !end.isValid) {
	    return Interval.invalid("missing or invalid end");
	  } else if (end < start) {
	    return Interval.invalid(
	      "end before start",
	      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
	    );
	  } else {
	    return null;
	  }
	}

	/**
	 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
	 *
	 * Here is a brief overview of the most commonly used methods and getters in Interval:
	 *
	 * * **Creation** To create an Interval, use {@link Interval.fromDateTimes}, {@link Interval.after}, {@link Interval.before}, or {@link Interval.fromISO}.
	 * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
	 * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
	 * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval.merge}, {@link Interval.xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
	 * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
	 * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toLocaleString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
	 */
	class Interval {
	  /**
	   * @private
	   */
	  constructor(config) {
	    /**
	     * @access private
	     */
	    this.s = config.start;
	    /**
	     * @access private
	     */
	    this.e = config.end;
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.isLuxonInterval = true;
	  }

	  /**
	   * Create an invalid Interval.
	   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Interval}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidIntervalError(invalid);
	    } else {
	      return new Interval({ invalid });
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
	   * @param {DateTime|Date|Object} start
	   * @param {DateTime|Date|Object} end
	   * @return {Interval}
	   */
	  static fromDateTimes(start, end) {
	    const builtStart = friendlyDateTime(start),
	      builtEnd = friendlyDateTime(end);

	    const validateError = validateStartEnd(builtStart, builtEnd);

	    if (validateError == null) {
	      return new Interval({
	        start: builtStart,
	        end: builtEnd,
	      });
	    } else {
	      return validateError;
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and a Duration to extend to.
	   * @param {DateTime|Date|Object} start
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static after(start, duration) {
	    const dur = Duration.fromDurationLike(duration),
	      dt = friendlyDateTime(start);
	    return Interval.fromDateTimes(dt, dt.plus(dur));
	  }

	  /**
	   * Create an Interval from an end DateTime and a Duration to extend backwards to.
	   * @param {DateTime|Date|Object} end
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static before(end, duration) {
	    const dur = Duration.fromDurationLike(duration),
	      dt = friendlyDateTime(end);
	    return Interval.fromDateTimes(dt.minus(dur), dt);
	  }

	  /**
	   * Create an Interval from an ISO 8601 string.
	   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
	   * @param {string} text - the ISO string to parse
	   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {Interval}
	   */
	  static fromISO(text, opts) {
	    const [s, e] = (text || "").split("/", 2);
	    if (s && e) {
	      let start, startIsValid;
	      try {
	        start = DateTime.fromISO(s, opts);
	        startIsValid = start.isValid;
	      } catch (e) {
	        startIsValid = false;
	      }

	      let end, endIsValid;
	      try {
	        end = DateTime.fromISO(e, opts);
	        endIsValid = end.isValid;
	      } catch (e) {
	        endIsValid = false;
	      }

	      if (startIsValid && endIsValid) {
	        return Interval.fromDateTimes(start, end);
	      }

	      if (startIsValid) {
	        const dur = Duration.fromISO(e, opts);
	        if (dur.isValid) {
	          return Interval.after(start, dur);
	        }
	      } else if (endIsValid) {
	        const dur = Duration.fromISO(s, opts);
	        if (dur.isValid) {
	          return Interval.before(end, dur);
	        }
	      }
	    }
	    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	  }

	  /**
	   * Check if an object is an Interval. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isInterval(o) {
	    return (o && o.isLuxonInterval) || false;
	  }

	  /**
	   * Returns the start of the Interval
	   * @type {DateTime}
	   */
	  get start() {
	    return this.isValid ? this.s : null;
	  }

	  /**
	   * Returns the end of the Interval
	   * @type {DateTime}
	   */
	  get end() {
	    return this.isValid ? this.e : null;
	  }

	  /**
	   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalidReason === null;
	  }

	  /**
	   * Returns an error code if this Interval is invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Returns the length of the Interval in the specified unit.
	   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
	   * @return {number}
	   */
	  length(unit = "milliseconds") {
	    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
	  }

	  /**
	   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
	   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
	   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
	   * @param {string} [unit='milliseconds'] - the unit of time to count.
	   * @return {number}
	   */
	  count(unit = "milliseconds") {
	    if (!this.isValid) return NaN;
	    const start = this.start.startOf(unit),
	      end = this.end.startOf(unit);
	    return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
	  }

	  /**
	   * Returns whether this Interval's start and end are both in the same unit of time
	   * @param {string} unit - the unit of time to check sameness on
	   * @return {boolean}
	   */
	  hasSame(unit) {
	    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
	  }

	  /**
	   * Return whether this Interval has the same start and end DateTimes.
	   * @return {boolean}
	   */
	  isEmpty() {
	    return this.s.valueOf() === this.e.valueOf();
	  }

	  /**
	   * Return whether this Interval's start is after the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isAfter(dateTime) {
	    if (!this.isValid) return false;
	    return this.s > dateTime;
	  }

	  /**
	   * Return whether this Interval's end is before the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isBefore(dateTime) {
	    if (!this.isValid) return false;
	    return this.e <= dateTime;
	  }

	  /**
	   * Return whether this Interval contains the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  contains(dateTime) {
	    if (!this.isValid) return false;
	    return this.s <= dateTime && this.e > dateTime;
	  }

	  /**
	   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
	   * @param {Object} values - the values to set
	   * @param {DateTime} values.start - the starting DateTime
	   * @param {DateTime} values.end - the ending DateTime
	   * @return {Interval}
	   */
	  set({ start, end } = {}) {
	    if (!this.isValid) return this;
	    return Interval.fromDateTimes(start || this.s, end || this.e);
	  }

	  /**
	   * Split this Interval at each of the specified DateTimes
	   * @param {...DateTime} dateTimes - the unit of time to count.
	   * @return {Array}
	   */
	  splitAt(...dateTimes) {
	    if (!this.isValid) return [];
	    const sorted = dateTimes
	        .map(friendlyDateTime)
	        .filter((d) => this.contains(d))
	        .sort(),
	      results = [];
	    let { s } = this,
	      i = 0;

	    while (s < this.e) {
	      const added = sorted[i] || this.e,
	        next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	      i += 1;
	    }

	    return results;
	  }

	  /**
	   * Split this Interval into smaller Intervals, each of the specified length.
	   * Left over time is grouped into a smaller interval
	   * @param {Duration|Object|number} duration - The length of each resulting interval.
	   * @return {Array}
	   */
	  splitBy(duration) {
	    const dur = Duration.fromDurationLike(duration);

	    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
	      return [];
	    }

	    let { s } = this,
	      idx = 1,
	      next;

	    const results = [];
	    while (s < this.e) {
	      const added = this.start.plus(dur.mapUnits((x) => x * idx));
	      next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	      idx += 1;
	    }

	    return results;
	  }

	  /**
	   * Split this Interval into the specified number of smaller intervals.
	   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
	   * @return {Array}
	   */
	  divideEqually(numberOfParts) {
	    if (!this.isValid) return [];
	    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
	  }

	  /**
	   * Return whether this Interval overlaps with the specified Interval
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  overlaps(other) {
	    return this.e > other.s && this.s < other.e;
	  }

	  /**
	   * Return whether this Interval's end is adjacent to the specified Interval's start.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsStart(other) {
	    if (!this.isValid) return false;
	    return +this.e === +other.s;
	  }

	  /**
	   * Return whether this Interval's start is adjacent to the specified Interval's end.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsEnd(other) {
	    if (!this.isValid) return false;
	    return +other.e === +this.s;
	  }

	  /**
	   * Return whether this Interval engulfs the start and end of the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  engulfs(other) {
	    if (!this.isValid) return false;
	    return this.s <= other.s && this.e >= other.e;
	  }

	  /**
	   * Return whether this Interval has the same start and end as the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }

	    return this.s.equals(other.s) && this.e.equals(other.e);
	  }

	  /**
	   * Return an Interval representing the intersection of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
	   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  intersection(other) {
	    if (!this.isValid) return this;
	    const s = this.s > other.s ? this.s : other.s,
	      e = this.e < other.e ? this.e : other.e;

	    if (s >= e) {
	      return null;
	    } else {
	      return Interval.fromDateTimes(s, e);
	    }
	  }

	  /**
	   * Return an Interval representing the union of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  union(other) {
	    if (!this.isValid) return this;
	    const s = this.s < other.s ? this.s : other.s,
	      e = this.e > other.e ? this.e : other.e;
	    return Interval.fromDateTimes(s, e);
	  }

	  /**
	   * Merge an array of Intervals into a equivalent minimal set of Intervals.
	   * Combines overlapping and adjacent Intervals.
	   * @param {Array} intervals
	   * @return {Array}
	   */
	  static merge(intervals) {
	    const [found, final] = intervals
	      .sort((a, b) => a.s - b.s)
	      .reduce(
	        ([sofar, current], item) => {
	          if (!current) {
	            return [sofar, item];
	          } else if (current.overlaps(item) || current.abutsStart(item)) {
	            return [sofar, current.union(item)];
	          } else {
	            return [sofar.concat([current]), item];
	          }
	        },
	        [[], null]
	      );
	    if (final) {
	      found.push(final);
	    }
	    return found;
	  }

	  /**
	   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
	   * @param {Array} intervals
	   * @return {Array}
	   */
	  static xor(intervals) {
	    let start = null,
	      currentCount = 0;
	    const results = [],
	      ends = intervals.map((i) => [
	        { time: i.s, type: "s" },
	        { time: i.e, type: "e" },
	      ]),
	      flattened = Array.prototype.concat(...ends),
	      arr = flattened.sort((a, b) => a.time - b.time);

	    for (const i of arr) {
	      currentCount += i.type === "s" ? 1 : -1;

	      if (currentCount === 1) {
	        start = i.time;
	      } else {
	        if (start && +start !== +i.time) {
	          results.push(Interval.fromDateTimes(start, i.time));
	        }

	        start = null;
	      }
	    }

	    return Interval.merge(results);
	  }

	  /**
	   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
	   * @param {...Interval} intervals
	   * @return {Array}
	   */
	  difference(...intervals) {
	    return Interval.xor([this].concat(intervals))
	      .map((i) => this.intersection(i))
	      .filter((i) => i && !i.isEmpty());
	  }

	  /**
	   * Returns a string representation of this Interval appropriate for debugging.
	   * @return {string}
	   */
	  toString() {
	    if (!this.isValid) return INVALID$1;
	    return `[${this.s.toISO()} – ${this.e.toISO()})`;
	  }

	  /**
	   * Returns a localized string representing this Interval. Accepts the same options as the
	   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
	   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
	   * is browser-specific, but in general it will return an appropriate representation of the
	   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
	   * specified.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
	   * Intl.DateTimeFormat constructor options.
	   * @param {Object} opts - Options to override the configuration of the start DateTime.
	   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
	   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
	   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
	   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
	   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
	   * @return {string}
	   */
	  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this)
	      : INVALID$1;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Interval.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime#toISO}
	   * @return {string}
	   */
	  toISO(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of date of this Interval.
	   * The time components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {string}
	   */
	  toISODate() {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISODate()}/${this.e.toISODate()}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of time of this Interval.
	   * The date components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime#toISO}
	   * @return {string}
	   */
	  toISOTime(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this Interval formatted according to the specified format
	   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
	   * formatting tool.
	   * @param {string} dateFormat - The format string. This string formats the start and end time.
	   * See {@link DateTime#toFormat} for details.
	   * @param {Object} opts - Options.
	   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
	   * representations.
	   * @return {string}
	   */
	  toFormat(dateFormat, { separator = " – " } = {}) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
	  }

	  /**
	   * Return a Duration representing the time spanned by this interval.
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
	   * @return {Duration}
	   */
	  toDuration(unit, opts) {
	    if (!this.isValid) {
	      return Duration.invalid(this.invalidReason);
	    }
	    return this.e.diff(this.s, unit, opts);
	  }

	  /**
	   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
	   * @param {function} mapFn
	   * @return {Interval}
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
	   */
	  mapEndpoints(mapFn) {
	    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
	  }
	}

	/**
	 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
	 */
	class Info {
	  /**
	   * Return whether the specified zone contains a DST.
	   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
	   * @return {boolean}
	   */
	  static hasDST(zone = Settings.defaultZone) {
	    const proto = DateTime.now().setZone(zone).set({ month: 12 });

	    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
	  }

	  /**
	   * Return whether the specified zone is a valid IANA specifier.
	   * @param {string} zone - Zone to check
	   * @return {boolean}
	   */
	  static isValidIANAZone(zone) {
	    return IANAZone.isValidZone(zone);
	  }

	  /**
	   * Converts the input into a {@link Zone} instance.
	   *
	   * * If `input` is already a Zone instance, it is returned unchanged.
	   * * If `input` is a string containing a valid time zone name, a Zone instance
	   *   with that name is returned.
	   * * If `input` is a string that doesn't refer to a known time zone, a Zone
	   *   instance with {@link Zone#isValid} == false is returned.
	   * * If `input is a number, a Zone instance with the specified fixed offset
	   *   in minutes is returned.
	   * * If `input` is `null` or `undefined`, the default zone is returned.
	   * @param {string|Zone|number} [input] - the value to be converted
	   * @return {Zone}
	   */
	  static normalizeZone(input) {
	    return normalizeZone(input, Settings.defaultZone);
	  }

	  /**
	   * Return an array of standalone month names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @example Info.months()[0] //=> 'January'
	   * @example Info.months('short')[0] //=> 'Jan'
	   * @example Info.months('numeric')[0] //=> '1'
	   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
	   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
	   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
	   * @return {Array}
	   */
	  static months(
	    length = "long",
	    { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}
	  ) {
	    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
	  }

	  /**
	   * Return an array of format month names.
	   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
	   * changes the string.
	   * See {@link Info#months}
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @return {Array}
	   */
	  static monthsFormat(
	    length = "long",
	    { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}
	  ) {
	    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
	  }

	  /**
	   * Return an array of standalone week names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @example Info.weekdays()[0] //=> 'Monday'
	   * @example Info.weekdays('short')[0] //=> 'Mon'
	   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
	   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
	   * @return {Array}
	   */
	  static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
	    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
	  }

	  /**
	   * Return an array of format week names.
	   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
	   * changes the string.
	   * See {@link Info#weekdays}
	   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale=null] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @return {Array}
	   */
	  static weekdaysFormat(
	    length = "long",
	    { locale = null, numberingSystem = null, locObj = null } = {}
	  ) {
	    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
	  }

	  /**
	   * Return an array of meridiems.
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
	   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
	   * @return {Array}
	   */
	  static meridiems({ locale = null } = {}) {
	    return Locale.create(locale).meridiems();
	  }

	  /**
	   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
	   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.eras() //=> [ 'BC', 'AD' ]
	   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
	   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
	   * @return {Array}
	   */
	  static eras(length = "short", { locale = null } = {}) {
	    return Locale.create(locale, null, "gregory").eras(length);
	  }

	  /**
	   * Return the set of available features in this environment.
	   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
	   * Keys:
	   * * `relative`: whether this environment supports relative time formatting
	   * @example Info.features() //=> { relative: false }
	   * @return {Object}
	   */
	  static features() {
	    return { relative: hasRelative() };
	  }
	}

	function dayDiff(earlier, later) {
	  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(),
	    ms = utcDayStart(later) - utcDayStart(earlier);
	  return Math.floor(Duration.fromMillis(ms).as("days"));
	}

	function highOrderDiffs(cursor, later, units) {
	  const differs = [
	    ["years", (a, b) => b.year - a.year],
	    ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4],
	    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
	    [
	      "weeks",
	      (a, b) => {
	        const days = dayDiff(a, b);
	        return (days - (days % 7)) / 7;
	      },
	    ],
	    ["days", dayDiff],
	  ];

	  const results = {};
	  const earlier = cursor;
	  let lowestOrder, highWater;

	  /* This loop tries to diff using larger units first.
	     If we overshoot, we backtrack and try the next smaller unit.
	     "cursor" starts out at the earlier timestamp and moves closer and closer to "later"
	     as we use smaller and smaller units.
	     highWater keeps track of where we would be if we added one more of the smallest unit,
	     this is used later to potentially convert any difference smaller than the smallest higher order unit
	     into a fraction of that smallest higher order unit
	  */
	  for (const [unit, differ] of differs) {
	    if (units.indexOf(unit) >= 0) {
	      lowestOrder = unit;

	      results[unit] = differ(cursor, later);
	      highWater = earlier.plus(results);

	      if (highWater > later) {
	        // we overshot the end point, backtrack cursor by 1
	        results[unit]--;
	        cursor = earlier.plus(results);

	        // if we are still overshooting now, we need to backtrack again
	        // this happens in certain situations when diffing times in different zones,
	        // because this calculation ignores time zones
	        if (cursor > later) {
	          // keep the "overshot by 1" around as highWater
	          highWater = cursor;
	          // backtrack cursor by 1
	          results[unit]--;
	          cursor = earlier.plus(results);
	        }
	      } else {
	        cursor = highWater;
	      }
	    }
	  }

	  return [cursor, results, highWater, lowestOrder];
	}

	function diff (earlier, later, units, opts) {
	  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

	  const remainingMillis = later - cursor;

	  const lowerOrderUnits = units.filter(
	    (u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
	  );

	  if (lowerOrderUnits.length === 0) {
	    if (highWater < later) {
	      highWater = cursor.plus({ [lowestOrder]: 1 });
	    }

	    if (highWater !== cursor) {
	      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
	    }
	  }

	  const duration = Duration.fromObject(results, opts);

	  if (lowerOrderUnits.length > 0) {
	    return Duration.fromMillis(remainingMillis, opts)
	      .shiftTo(...lowerOrderUnits)
	      .plus(duration);
	  } else {
	    return duration;
	  }
	}

	const numberingSystems = {
	  arab: "[\u0660-\u0669]",
	  arabext: "[\u06F0-\u06F9]",
	  bali: "[\u1B50-\u1B59]",
	  beng: "[\u09E6-\u09EF]",
	  deva: "[\u0966-\u096F]",
	  fullwide: "[\uFF10-\uFF19]",
	  gujr: "[\u0AE6-\u0AEF]",
	  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
	  khmr: "[\u17E0-\u17E9]",
	  knda: "[\u0CE6-\u0CEF]",
	  laoo: "[\u0ED0-\u0ED9]",
	  limb: "[\u1946-\u194F]",
	  mlym: "[\u0D66-\u0D6F]",
	  mong: "[\u1810-\u1819]",
	  mymr: "[\u1040-\u1049]",
	  orya: "[\u0B66-\u0B6F]",
	  tamldec: "[\u0BE6-\u0BEF]",
	  telu: "[\u0C66-\u0C6F]",
	  thai: "[\u0E50-\u0E59]",
	  tibt: "[\u0F20-\u0F29]",
	  latn: "\\d",
	};

	const numberingSystemsUTF16 = {
	  arab: [1632, 1641],
	  arabext: [1776, 1785],
	  bali: [6992, 7001],
	  beng: [2534, 2543],
	  deva: [2406, 2415],
	  fullwide: [65296, 65303],
	  gujr: [2790, 2799],
	  khmr: [6112, 6121],
	  knda: [3302, 3311],
	  laoo: [3792, 3801],
	  limb: [6470, 6479],
	  mlym: [3430, 3439],
	  mong: [6160, 6169],
	  mymr: [4160, 4169],
	  orya: [2918, 2927],
	  tamldec: [3046, 3055],
	  telu: [3174, 3183],
	  thai: [3664, 3673],
	  tibt: [3872, 3881],
	};

	const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");

	function parseDigits(str) {
	  let value = parseInt(str, 10);
	  if (isNaN(value)) {
	    value = "";
	    for (let i = 0; i < str.length; i++) {
	      const code = str.charCodeAt(i);

	      if (str[i].search(numberingSystems.hanidec) !== -1) {
	        value += hanidecChars.indexOf(str[i]);
	      } else {
	        for (const key in numberingSystemsUTF16) {
	          const [min, max] = numberingSystemsUTF16[key];
	          if (code >= min && code <= max) {
	            value += code - min;
	          }
	        }
	      }
	    }
	    return parseInt(value, 10);
	  } else {
	    return value;
	  }
	}

	function digitRegex({ numberingSystem }, append = "") {
	  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
	}

	const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

	function intUnit(regex, post = (i) => i) {
	  return { regex, deser: ([s]) => post(parseDigits(s)) };
	}

	const NBSP = String.fromCharCode(160);
	const spaceOrNBSP = `[ ${NBSP}]`;
	const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

	function fixListRegex(s) {
	  // make dots optional and also make them literal
	  // make space and non breakable space characters interchangeable
	  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
	}

	function stripInsensitivities(s) {
	  return s
	    .replace(/\./g, "") // ignore dots that were made optional
	    .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
	    .toLowerCase();
	}

	function oneOf(strings, startIndex) {
	  if (strings === null) {
	    return null;
	  } else {
	    return {
	      regex: RegExp(strings.map(fixListRegex).join("|")),
	      deser: ([s]) =>
	        strings.findIndex((i) => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex,
	    };
	  }
	}

	function offset(regex, groups) {
	  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
	}

	function simple(regex) {
	  return { regex, deser: ([s]) => s };
	}

	function escapeToken(value) {
	  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	}

	/**
	 * @param token
	 * @param {Locale} loc
	 */
	function unitForToken(token, loc) {
	  const one = digitRegex(loc),
	    two = digitRegex(loc, "{2}"),
	    three = digitRegex(loc, "{3}"),
	    four = digitRegex(loc, "{4}"),
	    six = digitRegex(loc, "{6}"),
	    oneOrTwo = digitRegex(loc, "{1,2}"),
	    oneToThree = digitRegex(loc, "{1,3}"),
	    oneToSix = digitRegex(loc, "{1,6}"),
	    oneToNine = digitRegex(loc, "{1,9}"),
	    twoToFour = digitRegex(loc, "{2,4}"),
	    fourToSix = digitRegex(loc, "{4,6}"),
	    literal = (t) => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }),
	    unitate = (t) => {
	      if (token.literal) {
	        return literal(t);
	      }
	      switch (t.val) {
	        // era
	        case "G":
	          return oneOf(loc.eras("short"), 0);
	        case "GG":
	          return oneOf(loc.eras("long"), 0);
	        // years
	        case "y":
	          return intUnit(oneToSix);
	        case "yy":
	          return intUnit(twoToFour, untruncateYear);
	        case "yyyy":
	          return intUnit(four);
	        case "yyyyy":
	          return intUnit(fourToSix);
	        case "yyyyyy":
	          return intUnit(six);
	        // months
	        case "M":
	          return intUnit(oneOrTwo);
	        case "MM":
	          return intUnit(two);
	        case "MMM":
	          return oneOf(loc.months("short", true), 1);
	        case "MMMM":
	          return oneOf(loc.months("long", true), 1);
	        case "L":
	          return intUnit(oneOrTwo);
	        case "LL":
	          return intUnit(two);
	        case "LLL":
	          return oneOf(loc.months("short", false), 1);
	        case "LLLL":
	          return oneOf(loc.months("long", false), 1);
	        // dates
	        case "d":
	          return intUnit(oneOrTwo);
	        case "dd":
	          return intUnit(two);
	        // ordinals
	        case "o":
	          return intUnit(oneToThree);
	        case "ooo":
	          return intUnit(three);
	        // time
	        case "HH":
	          return intUnit(two);
	        case "H":
	          return intUnit(oneOrTwo);
	        case "hh":
	          return intUnit(two);
	        case "h":
	          return intUnit(oneOrTwo);
	        case "mm":
	          return intUnit(two);
	        case "m":
	          return intUnit(oneOrTwo);
	        case "q":
	          return intUnit(oneOrTwo);
	        case "qq":
	          return intUnit(two);
	        case "s":
	          return intUnit(oneOrTwo);
	        case "ss":
	          return intUnit(two);
	        case "S":
	          return intUnit(oneToThree);
	        case "SSS":
	          return intUnit(three);
	        case "u":
	          return simple(oneToNine);
	        case "uu":
	          return simple(oneOrTwo);
	        case "uuu":
	          return intUnit(one);
	        // meridiem
	        case "a":
	          return oneOf(loc.meridiems(), 0);
	        // weekYear (k)
	        case "kkkk":
	          return intUnit(four);
	        case "kk":
	          return intUnit(twoToFour, untruncateYear);
	        // weekNumber (W)
	        case "W":
	          return intUnit(oneOrTwo);
	        case "WW":
	          return intUnit(two);
	        // weekdays
	        case "E":
	        case "c":
	          return intUnit(one);
	        case "EEE":
	          return oneOf(loc.weekdays("short", false), 1);
	        case "EEEE":
	          return oneOf(loc.weekdays("long", false), 1);
	        case "ccc":
	          return oneOf(loc.weekdays("short", true), 1);
	        case "cccc":
	          return oneOf(loc.weekdays("long", true), 1);
	        // offset/zone
	        case "Z":
	        case "ZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
	        case "ZZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
	        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
	        // because we don't have any way to figure out what they are
	        case "z":
	          return simple(/[a-z_+-/]{1,256}?/i);
	        // this special-case "token" represents a place where a macro-token expanded into a white-space literal
	        // in this case we accept any non-newline white-space
	        case " ":
	          return simple(/[^\S\n\r]/);
	        default:
	          return literal(t);
	      }
	    };

	  const unit = unitate(token) || {
	    invalidReason: MISSING_FTP,
	  };

	  unit.token = token;

	  return unit;
	}

	const partTypeStyleToTokenVal = {
	  year: {
	    "2-digit": "yy",
	    numeric: "yyyyy",
	  },
	  month: {
	    numeric: "M",
	    "2-digit": "MM",
	    short: "MMM",
	    long: "MMMM",
	  },
	  day: {
	    numeric: "d",
	    "2-digit": "dd",
	  },
	  weekday: {
	    short: "EEE",
	    long: "EEEE",
	  },
	  dayperiod: "a",
	  dayPeriod: "a",
	  hour12: {
	    numeric: "h",
	    "2-digit": "hh",
	  },
	  hour24: {
	    numeric: "H",
	    "2-digit": "HH",
	  },
	  minute: {
	    numeric: "m",
	    "2-digit": "mm",
	  },
	  second: {
	    numeric: "s",
	    "2-digit": "ss",
	  },
	  timeZoneName: {
	    long: "ZZZZZ",
	    short: "ZZZ",
	  },
	};

	function tokenForPart(part, formatOpts, resolvedOpts) {
	  const { type, value } = part;

	  if (type === "literal") {
	    const isSpace = /^\s+$/.test(value);
	    return {
	      literal: !isSpace,
	      val: isSpace ? " " : value,
	    };
	  }

	  const style = formatOpts[type];

	  // The user might have explicitly specified hour12 or hourCycle
	  // if so, respect their decision
	  // if not, refer back to the resolvedOpts, which are based on the locale
	  let actualType = type;
	  if (type === "hour") {
	    if (formatOpts.hour12 != null) {
	      actualType = formatOpts.hour12 ? "hour12" : "hour24";
	    } else if (formatOpts.hourCycle != null) {
	      if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
	        actualType = "hour12";
	      } else {
	        actualType = "hour24";
	      }
	    } else {
	      // tokens only differentiate between 24 hours or not,
	      // so we do not need to check hourCycle here, which is less supported anyways
	      actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
	    }
	  }
	  let val = partTypeStyleToTokenVal[actualType];
	  if (typeof val === "object") {
	    val = val[style];
	  }

	  if (val) {
	    return {
	      literal: false,
	      val,
	    };
	  }

	  return undefined;
	}

	function buildRegex(units) {
	  const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
	  return [`^${re}$`, units];
	}

	function match(input, regex, handlers) {
	  const matches = input.match(regex);

	  if (matches) {
	    const all = {};
	    let matchIndex = 1;
	    for (const i in handlers) {
	      if (hasOwnProperty(handlers, i)) {
	        const h = handlers[i],
	          groups = h.groups ? h.groups + 1 : 1;
	        if (!h.literal && h.token) {
	          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
	        }
	        matchIndex += groups;
	      }
	    }
	    return [matches, all];
	  } else {
	    return [matches, {}];
	  }
	}

	function dateTimeFromMatches(matches) {
	  const toField = (token) => {
	    switch (token) {
	      case "S":
	        return "millisecond";
	      case "s":
	        return "second";
	      case "m":
	        return "minute";
	      case "h":
	      case "H":
	        return "hour";
	      case "d":
	        return "day";
	      case "o":
	        return "ordinal";
	      case "L":
	      case "M":
	        return "month";
	      case "y":
	        return "year";
	      case "E":
	      case "c":
	        return "weekday";
	      case "W":
	        return "weekNumber";
	      case "k":
	        return "weekYear";
	      case "q":
	        return "quarter";
	      default:
	        return null;
	    }
	  };

	  let zone = null;
	  let specificOffset;
	  if (!isUndefined(matches.z)) {
	    zone = IANAZone.create(matches.z);
	  }

	  if (!isUndefined(matches.Z)) {
	    if (!zone) {
	      zone = new FixedOffsetZone(matches.Z);
	    }
	    specificOffset = matches.Z;
	  }

	  if (!isUndefined(matches.q)) {
	    matches.M = (matches.q - 1) * 3 + 1;
	  }

	  if (!isUndefined(matches.h)) {
	    if (matches.h < 12 && matches.a === 1) {
	      matches.h += 12;
	    } else if (matches.h === 12 && matches.a === 0) {
	      matches.h = 0;
	    }
	  }

	  if (matches.G === 0 && matches.y) {
	    matches.y = -matches.y;
	  }

	  if (!isUndefined(matches.u)) {
	    matches.S = parseMillis(matches.u);
	  }

	  const vals = Object.keys(matches).reduce((r, k) => {
	    const f = toField(k);
	    if (f) {
	      r[f] = matches[k];
	    }

	    return r;
	  }, {});

	  return [vals, zone, specificOffset];
	}

	let dummyDateTimeCache = null;

	function getDummyDateTime() {
	  if (!dummyDateTimeCache) {
	    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
	  }

	  return dummyDateTimeCache;
	}

	function maybeExpandMacroToken(token, locale) {
	  if (token.literal) {
	    return token;
	  }

	  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
	  const tokens = formatOptsToTokens(formatOpts, locale);

	  if (tokens == null || tokens.includes(undefined)) {
	    return token;
	  }

	  return tokens;
	}

	function expandMacroTokens(tokens, locale) {
	  return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
	}

	/**
	 * @private
	 */

	function explainFromTokens(locale, input, format) {
	  const tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
	    units = tokens.map((t) => unitForToken(t, locale)),
	    disqualifyingUnit = units.find((t) => t.invalidReason);

	  if (disqualifyingUnit) {
	    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
	  } else {
	    const [regexString, handlers] = buildRegex(units),
	      regex = RegExp(regexString, "i"),
	      [rawMatches, matches] = match(input, regex, handlers),
	      [result, zone, specificOffset] = matches
	        ? dateTimeFromMatches(matches)
	        : [null, null, undefined];
	    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
	      throw new ConflictingSpecificationError(
	        "Can't include meridiem when specifying 24-hour format"
	      );
	    }
	    return { input, tokens, regex, rawMatches, matches, result, zone, specificOffset };
	  }
	}

	function parseFromTokens(locale, input, format) {
	  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
	  return [result, zone, specificOffset, invalidReason];
	}

	function formatOptsToTokens(formatOpts, locale) {
	  if (!formatOpts) {
	    return null;
	  }

	  const formatter = Formatter.create(locale, formatOpts);
	  const df = formatter.dtFormatter(getDummyDateTime());
	  const parts = df.formatToParts();
	  const resolvedOpts = df.resolvedOptions();
	  return parts.map((p) => tokenForPart(p, formatOpts, resolvedOpts));
	}

	const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	  leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

	function unitOutOfRange(unit, value) {
	  return new Invalid(
	    "unit out of range",
	    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
	  );
	}

	function dayOfWeek(year, month, day) {
	  const d = new Date(Date.UTC(year, month - 1, day));

	  if (year < 100 && year >= 0) {
	    d.setUTCFullYear(d.getUTCFullYear() - 1900);
	  }

	  const js = d.getUTCDay();

	  return js === 0 ? 7 : js;
	}

	function computeOrdinal(year, month, day) {
	  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
	}

	function uncomputeOrdinal(year, ordinal) {
	  const table = isLeapYear(year) ? leapLadder : nonLeapLadder,
	    month0 = table.findIndex((i) => i < ordinal),
	    day = ordinal - table[month0];
	  return { month: month0 + 1, day };
	}

	/**
	 * @private
	 */

	function gregorianToWeek(gregObj) {
	  const { year, month, day } = gregObj,
	    ordinal = computeOrdinal(year, month, day),
	    weekday = dayOfWeek(year, month, day);

	  let weekNumber = Math.floor((ordinal - weekday + 10) / 7),
	    weekYear;

	  if (weekNumber < 1) {
	    weekYear = year - 1;
	    weekNumber = weeksInWeekYear(weekYear);
	  } else if (weekNumber > weeksInWeekYear(year)) {
	    weekYear = year + 1;
	    weekNumber = 1;
	  } else {
	    weekYear = year;
	  }

	  return { weekYear, weekNumber, weekday, ...timeObject(gregObj) };
	}

	function weekToGregorian(weekData) {
	  const { weekYear, weekNumber, weekday } = weekData,
	    weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
	    yearInDays = daysInYear(weekYear);

	  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
	    year;

	  if (ordinal < 1) {
	    year = weekYear - 1;
	    ordinal += daysInYear(year);
	  } else if (ordinal > yearInDays) {
	    year = weekYear + 1;
	    ordinal -= daysInYear(weekYear);
	  } else {
	    year = weekYear;
	  }

	  const { month, day } = uncomputeOrdinal(year, ordinal);
	  return { year, month, day, ...timeObject(weekData) };
	}

	function gregorianToOrdinal(gregData) {
	  const { year, month, day } = gregData;
	  const ordinal = computeOrdinal(year, month, day);
	  return { year, ordinal, ...timeObject(gregData) };
	}

	function ordinalToGregorian(ordinalData) {
	  const { year, ordinal } = ordinalData;
	  const { month, day } = uncomputeOrdinal(year, ordinal);
	  return { year, month, day, ...timeObject(ordinalData) };
	}

	function hasInvalidWeekData(obj) {
	  const validYear = isInteger(obj.weekYear),
	    validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
	    validWeekday = integerBetween(obj.weekday, 1, 7);

	  if (!validYear) {
	    return unitOutOfRange("weekYear", obj.weekYear);
	  } else if (!validWeek) {
	    return unitOutOfRange("week", obj.week);
	  } else if (!validWeekday) {
	    return unitOutOfRange("weekday", obj.weekday);
	  } else return false;
	}

	function hasInvalidOrdinalData(obj) {
	  const validYear = isInteger(obj.year),
	    validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validOrdinal) {
	    return unitOutOfRange("ordinal", obj.ordinal);
	  } else return false;
	}

	function hasInvalidGregorianData(obj) {
	  const validYear = isInteger(obj.year),
	    validMonth = integerBetween(obj.month, 1, 12),
	    validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validMonth) {
	    return unitOutOfRange("month", obj.month);
	  } else if (!validDay) {
	    return unitOutOfRange("day", obj.day);
	  } else return false;
	}

	function hasInvalidTimeData(obj) {
	  const { hour, minute, second, millisecond } = obj;
	  const validHour =
	      integerBetween(hour, 0, 23) ||
	      (hour === 24 && minute === 0 && second === 0 && millisecond === 0),
	    validMinute = integerBetween(minute, 0, 59),
	    validSecond = integerBetween(second, 0, 59),
	    validMillisecond = integerBetween(millisecond, 0, 999);

	  if (!validHour) {
	    return unitOutOfRange("hour", hour);
	  } else if (!validMinute) {
	    return unitOutOfRange("minute", minute);
	  } else if (!validSecond) {
	    return unitOutOfRange("second", second);
	  } else if (!validMillisecond) {
	    return unitOutOfRange("millisecond", millisecond);
	  } else return false;
	}

	const INVALID = "Invalid DateTime";
	const MAX_DATE = 8.64e15;

	function unsupportedZone(zone) {
	  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
	}

	// we cache week data on the DT object and this intermediates the cache
	function possiblyCachedWeekData(dt) {
	  if (dt.weekData === null) {
	    dt.weekData = gregorianToWeek(dt.c);
	  }
	  return dt.weekData;
	}

	// clone really means, "make a new object with these modifications". all "setters" really use this
	// to create a new object while only changing some of the properties
	function clone(inst, alts) {
	  const current = {
	    ts: inst.ts,
	    zone: inst.zone,
	    c: inst.c,
	    o: inst.o,
	    loc: inst.loc,
	    invalid: inst.invalid,
	  };
	  return new DateTime({ ...current, ...alts, old: current });
	}

	// find the right offset a given local time. The o input is our guess, which determines which
	// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
	function fixOffset(localTS, o, tz) {
	  // Our UTC time is just a guess because our offset is just a guess
	  let utcGuess = localTS - o * 60 * 1000;

	  // Test whether the zone matches the offset for this ts
	  const o2 = tz.offset(utcGuess);

	  // If so, offset didn't change and we're done
	  if (o === o2) {
	    return [utcGuess, o];
	  }

	  // If not, change the ts by the difference in the offset
	  utcGuess -= (o2 - o) * 60 * 1000;

	  // If that gives us the local time we want, we're done
	  const o3 = tz.offset(utcGuess);
	  if (o2 === o3) {
	    return [utcGuess, o2];
	  }

	  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
	  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
	}

	// convert an epoch timestamp into a calendar object with the given offset
	function tsToObj(ts, offset) {
	  ts += offset * 60 * 1000;

	  const d = new Date(ts);

	  return {
	    year: d.getUTCFullYear(),
	    month: d.getUTCMonth() + 1,
	    day: d.getUTCDate(),
	    hour: d.getUTCHours(),
	    minute: d.getUTCMinutes(),
	    second: d.getUTCSeconds(),
	    millisecond: d.getUTCMilliseconds(),
	  };
	}

	// convert a calendar object to a epoch timestamp
	function objToTS(obj, offset, zone) {
	  return fixOffset(objToLocalTS(obj), offset, zone);
	}

	// create a new DT instance by adding a duration, adjusting for DSTs
	function adjustTime(inst, dur) {
	  const oPre = inst.o,
	    year = inst.c.year + Math.trunc(dur.years),
	    month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
	    c = {
	      ...inst.c,
	      year,
	      month,
	      day:
	        Math.min(inst.c.day, daysInMonth(year, month)) +
	        Math.trunc(dur.days) +
	        Math.trunc(dur.weeks) * 7,
	    },
	    millisToAdd = Duration.fromObject({
	      years: dur.years - Math.trunc(dur.years),
	      quarters: dur.quarters - Math.trunc(dur.quarters),
	      months: dur.months - Math.trunc(dur.months),
	      weeks: dur.weeks - Math.trunc(dur.weeks),
	      days: dur.days - Math.trunc(dur.days),
	      hours: dur.hours,
	      minutes: dur.minutes,
	      seconds: dur.seconds,
	      milliseconds: dur.milliseconds,
	    }).as("milliseconds"),
	    localTS = objToLocalTS(c);

	  let [ts, o] = fixOffset(localTS, oPre, inst.zone);

	  if (millisToAdd !== 0) {
	    ts += millisToAdd;
	    // that could have changed the offset by going over a DST, but we want to keep the ts the same
	    o = inst.zone.offset(ts);
	  }

	  return { ts, o };
	}

	// helper useful in turning the results of parsing into real dates
	// by handling the zone options
	function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
	  const { setZone, zone } = opts;
	  if ((parsed && Object.keys(parsed).length !== 0) || parsedZone) {
	    const interpretationZone = parsedZone || zone,
	      inst = DateTime.fromObject(parsed, {
	        ...opts,
	        zone: interpretationZone,
	        specificOffset,
	      });
	    return setZone ? inst : inst.setZone(zone);
	  } else {
	    return DateTime.invalid(
	      new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
	    );
	  }
	}

	// if you want to output a technical format (e.g. RFC 2822), this helper
	// helps handle the details
	function toTechFormat(dt, format, allowZ = true) {
	  return dt.isValid
	    ? Formatter.create(Locale.create("en-US"), {
	        allowZ,
	        forceSimple: true,
	      }).formatDateTimeFromString(dt, format)
	    : null;
	}

	function toISODate(o, extended) {
	  const longFormat = o.c.year > 9999 || o.c.year < 0;
	  let c = "";
	  if (longFormat && o.c.year >= 0) c += "+";
	  c += padStart(o.c.year, longFormat ? 6 : 4);

	  if (extended) {
	    c += "-";
	    c += padStart(o.c.month);
	    c += "-";
	    c += padStart(o.c.day);
	  } else {
	    c += padStart(o.c.month);
	    c += padStart(o.c.day);
	  }
	  return c;
	}

	function toISOTime(
	  o,
	  extended,
	  suppressSeconds,
	  suppressMilliseconds,
	  includeOffset,
	  extendedZone
	) {
	  let c = padStart(o.c.hour);
	  if (extended) {
	    c += ":";
	    c += padStart(o.c.minute);
	    if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
	      c += ":";
	    }
	  } else {
	    c += padStart(o.c.minute);
	  }

	  if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
	    c += padStart(o.c.second);

	    if (o.c.millisecond !== 0 || !suppressMilliseconds) {
	      c += ".";
	      c += padStart(o.c.millisecond, 3);
	    }
	  }

	  if (includeOffset) {
	    if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
	      c += "Z";
	    } else if (o.o < 0) {
	      c += "-";
	      c += padStart(Math.trunc(-o.o / 60));
	      c += ":";
	      c += padStart(Math.trunc(-o.o % 60));
	    } else {
	      c += "+";
	      c += padStart(Math.trunc(o.o / 60));
	      c += ":";
	      c += padStart(Math.trunc(o.o % 60));
	    }
	  }

	  if (extendedZone) {
	    c += "[" + o.zone.ianaName + "]";
	  }
	  return c;
	}

	// defaults for unspecified units in the supported calendars
	const defaultUnitValues = {
	    month: 1,
	    day: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0,
	  },
	  defaultWeekUnitValues = {
	    weekNumber: 1,
	    weekday: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0,
	  },
	  defaultOrdinalUnitValues = {
	    ordinal: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0,
	  };

	// Units in the supported calendars, sorted by bigness
	const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
	  orderedWeekUnits = [
	    "weekYear",
	    "weekNumber",
	    "weekday",
	    "hour",
	    "minute",
	    "second",
	    "millisecond",
	  ],
	  orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

	// standardize case and plurality in units
	function normalizeUnit(unit) {
	  const normalized = {
	    year: "year",
	    years: "year",
	    month: "month",
	    months: "month",
	    day: "day",
	    days: "day",
	    hour: "hour",
	    hours: "hour",
	    minute: "minute",
	    minutes: "minute",
	    quarter: "quarter",
	    quarters: "quarter",
	    second: "second",
	    seconds: "second",
	    millisecond: "millisecond",
	    milliseconds: "millisecond",
	    weekday: "weekday",
	    weekdays: "weekday",
	    weeknumber: "weekNumber",
	    weeksnumber: "weekNumber",
	    weeknumbers: "weekNumber",
	    weekyear: "weekYear",
	    weekyears: "weekYear",
	    ordinal: "ordinal",
	  }[unit.toLowerCase()];

	  if (!normalized) throw new InvalidUnitError(unit);

	  return normalized;
	}

	// this is a dumbed down version of fromObject() that runs about 60% faster
	// but doesn't do any validation, makes a bunch of assumptions about what units
	// are present, and so on.
	function quickDT(obj, opts) {
	  const zone = normalizeZone(opts.zone, Settings.defaultZone),
	    loc = Locale.fromObject(opts),
	    tsNow = Settings.now();

	  let ts, o;

	  // assume we have the higher-order units
	  if (!isUndefined(obj.year)) {
	    for (const u of orderedUnits) {
	      if (isUndefined(obj[u])) {
	        obj[u] = defaultUnitValues[u];
	      }
	    }

	    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    }

	    const offsetProvis = zone.offset(tsNow);
	    [ts, o] = objToTS(obj, offsetProvis, zone);
	  } else {
	    ts = tsNow;
	  }

	  return new DateTime({ ts, zone, loc, o });
	}

	function diffRelative(start, end, opts) {
	  const round = isUndefined(opts.round) ? true : opts.round,
	    format = (c, unit) => {
	      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
	      const formatter = end.loc.clone(opts).relFormatter(opts);
	      return formatter.format(c, unit);
	    },
	    differ = (unit) => {
	      if (opts.calendary) {
	        if (!end.hasSame(start, unit)) {
	          return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
	        } else return 0;
	      } else {
	        return end.diff(start, unit).get(unit);
	      }
	    };

	  if (opts.unit) {
	    return format(differ(opts.unit), opts.unit);
	  }

	  for (const unit of opts.units) {
	    const count = differ(unit);
	    if (Math.abs(count) >= 1) {
	      return format(count, unit);
	    }
	  }
	  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
	}

	function lastOpts(argList) {
	  let opts = {},
	    args;
	  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
	    opts = argList[argList.length - 1];
	    args = Array.from(argList).slice(0, argList.length - 1);
	  } else {
	    args = Array.from(argList);
	  }
	  return [opts, args];
	}

	/**
	 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
	 *
	 * A DateTime comprises of:
	 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
	 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
	 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
	 *
	 * Here is a brief overview of the most commonly used functionality it provides:
	 *
	 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime.local}, {@link DateTime.utc}, and (most flexibly) {@link DateTime.fromObject}. To create one from a standard string format, use {@link DateTime.fromISO}, {@link DateTime.fromHTTP}, and {@link DateTime.fromRFC2822}. To create one from a custom string format, use {@link DateTime.fromFormat}. To create one from a native JS date, use {@link DateTime.fromJSDate}.
	 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
	 * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
	 * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
	 * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
	 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
	 * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
	 *
	 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
	 */
	class DateTime {
	  /**
	   * @access private
	   */
	  constructor(config) {
	    const zone = config.zone || Settings.defaultZone;

	    let invalid =
	      config.invalid ||
	      (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) ||
	      (!zone.isValid ? unsupportedZone(zone) : null);
	    /**
	     * @access private
	     */
	    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;

	    let c = null,
	      o = null;
	    if (!invalid) {
	      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

	      if (unchanged) {
	        [c, o] = [config.old.c, config.old.o];
	      } else {
	        const ot = zone.offset(this.ts);
	        c = tsToObj(this.ts, ot);
	        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
	        c = invalid ? null : c;
	        o = invalid ? null : ot;
	      }
	    }

	    /**
	     * @access private
	     */
	    this._zone = zone;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.invalid = invalid;
	    /**
	     * @access private
	     */
	    this.weekData = null;
	    /**
	     * @access private
	     */
	    this.c = c;
	    /**
	     * @access private
	     */
	    this.o = o;
	    /**
	     * @access private
	     */
	    this.isLuxonDateTime = true;
	  }

	  // CONSTRUCT

	  /**
	   * Create a DateTime for the current instant, in the system's time zone.
	   *
	   * Use Settings to override these default values if needed.
	   * @example DateTime.now().toISO() //~> now in the ISO format
	   * @return {DateTime}
	   */
	  static now() {
	    return new DateTime({});
	  }

	  /**
	   * Create a local DateTime
	   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month, 1-indexed
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @example DateTime.local()                                  //~> now
	   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
	   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
	   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
	   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
	   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
	   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
	   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
	   * @return {DateTime}
	   */
	  static local() {
	    const [opts, args] = lastOpts(arguments),
	      [year, month, day, hour, minute, second, millisecond] = args;
	    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
	  }

	  /**
	   * Create a DateTime in UTC
	   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
	   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.utc()                                              //~> now
	   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
	   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
	   * @return {DateTime}
	   */
	  static utc() {
	    const [opts, args] = lastOpts(arguments),
	      [year, month, day, hour, minute, second, millisecond] = args;

	    opts.zone = FixedOffsetZone.utcInstance;
	    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
	  }

	  /**
	   * Create a DateTime from a JavaScript Date object. Uses the default zone.
	   * @param {Date} date - a JavaScript Date object
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @return {DateTime}
	   */
	  static fromJSDate(date, options = {}) {
	    const ts = isDate(date) ? date.valueOf() : NaN;
	    if (Number.isNaN(ts)) {
	      return DateTime.invalid("invalid input");
	    }

	    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }

	    return new DateTime({
	      ts: ts,
	      zone: zoneToUse,
	      loc: Locale.fromObject(options),
	    });
	  }

	  /**
	   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromMillis(milliseconds, options = {}) {
	    if (!isNumber(milliseconds)) {
	      throw new InvalidArgumentError(
	        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
	      );
	    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
	      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
	      return DateTime.invalid("Timestamp out of range");
	    } else {
	      return new DateTime({
	        ts: milliseconds,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options),
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} seconds - a number of seconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromSeconds(seconds, options = {}) {
	    if (!isNumber(seconds)) {
	      throw new InvalidArgumentError("fromSeconds requires a numerical input");
	    } else {
	      return new DateTime({
	        ts: seconds * 1000,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options),
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.year - a year, such as 1987
	   * @param {number} obj.month - a month, 1-12
	   * @param {number} obj.day - a day of the month, 1-31, depending on the month
	   * @param {number} obj.ordinal - day of the year, 1-365 or 366
	   * @param {number} obj.weekYear - an ISO week year
	   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
	   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
	   * @param {number} obj.hour - hour of the day, 0-23
	   * @param {number} obj.minute - minute of the hour, 0-59
	   * @param {number} obj.second - second of the minute, 0-59
	   * @param {number} obj.millisecond - millisecond of the second, 0-999
	   * @param {Object} opts - options for creating this DateTime
	   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
	   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
	   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
	   * @return {DateTime}
	   */
	  static fromObject(obj, opts = {}) {
	    obj = obj || {};
	    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }

	    const tsNow = Settings.now(),
	      offsetProvis = !isUndefined(opts.specificOffset)
	        ? opts.specificOffset
	        : zoneToUse.offset(tsNow),
	      normalized = normalizeObject(obj, normalizeUnit),
	      containsOrdinal = !isUndefined(normalized.ordinal),
	      containsGregorYear = !isUndefined(normalized.year),
	      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
	      containsGregor = containsGregorYear || containsGregorMD,
	      definiteWeekDef = normalized.weekYear || normalized.weekNumber,
	      loc = Locale.fromObject(opts);

	    // cases:
	    // just a weekday -> this week's instance of that weekday, no worries
	    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
	    // (gregorian month or day) + ordinal -> error
	    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

	    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
	      throw new ConflictingSpecificationError(
	        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
	      );
	    }

	    if (containsGregorMD && containsOrdinal) {
	      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
	    }

	    const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);

	    // configure ourselves to deal with gregorian dates or week stuff
	    let units,
	      defaultValues,
	      objNow = tsToObj(tsNow, offsetProvis);
	    if (useWeekData) {
	      units = orderedWeekUnits;
	      defaultValues = defaultWeekUnitValues;
	      objNow = gregorianToWeek(objNow);
	    } else if (containsOrdinal) {
	      units = orderedOrdinalUnits;
	      defaultValues = defaultOrdinalUnitValues;
	      objNow = gregorianToOrdinal(objNow);
	    } else {
	      units = orderedUnits;
	      defaultValues = defaultUnitValues;
	    }

	    // set default values for missing stuff
	    let foundFirst = false;
	    for (const u of units) {
	      const v = normalized[u];
	      if (!isUndefined(v)) {
	        foundFirst = true;
	      } else if (foundFirst) {
	        normalized[u] = defaultValues[u];
	      } else {
	        normalized[u] = objNow[u];
	      }
	    }

	    // make sure the values we have are in range
	    const higherOrderInvalid = useWeekData
	        ? hasInvalidWeekData(normalized)
	        : containsOrdinal
	        ? hasInvalidOrdinalData(normalized)
	        : hasInvalidGregorianData(normalized),
	      invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

	    if (invalid) {
	      return DateTime.invalid(invalid);
	    }

	    // compute the actual time
	    const gregorian = useWeekData
	        ? weekToGregorian(normalized)
	        : containsOrdinal
	        ? ordinalToGregorian(normalized)
	        : normalized,
	      [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
	      inst = new DateTime({
	        ts: tsFinal,
	        zone: zoneToUse,
	        o: offsetFinal,
	        loc,
	      });

	    // gregorian data + weekday serves only to validate
	    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
	      return DateTime.invalid(
	        "mismatched weekday",
	        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
	      );
	    }

	    return inst;
	  }

	  /**
	   * Create a DateTime from an ISO 8601 string
	   * @param {string} text - the ISO string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
	   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
	   * @example DateTime.fromISO('2016-W05-4')
	   * @return {DateTime}
	   */
	  static fromISO(text, opts = {}) {
	    const [vals, parsedZone] = parseISODate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
	  }

	  /**
	   * Create a DateTime from an RFC 2822 string
	   * @param {string} text - the RFC 2822 string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
	   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
	   * @return {DateTime}
	   */
	  static fromRFC2822(text, opts = {}) {
	    const [vals, parsedZone] = parseRFC2822Date(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
	  }

	  /**
	   * Create a DateTime from an HTTP header date
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @param {string} text - the HTTP header date
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
	   * @return {DateTime}
	   */
	  static fromHTTP(text, opts = {}) {
	    const [vals, parsedZone] = parseHTTPDate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
	  }

	  /**
	   * Create a DateTime from an input string and format string.
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromFormat(text, fmt, opts = {}) {
	    if (isUndefined(text) || isUndefined(fmt)) {
	      throw new InvalidArgumentError("fromFormat requires an input string and a format");
	    }

	    const { locale = null, numberingSystem = null } = opts,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true,
	      }),
	      [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    } else {
	      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
	    }
	  }

	  /**
	   * @deprecated use fromFormat instead
	   */
	  static fromString(text, fmt, opts = {}) {
	    return DateTime.fromFormat(text, fmt, opts);
	  }

	  /**
	   * Create a DateTime from a SQL date, time, or datetime
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale
	   * @param {string} text - the string to parse
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @example DateTime.fromSQL('2017-05-15')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
	   * @example DateTime.fromSQL('09:12:34.342')
	   * @return {DateTime}
	   */
	  static fromSQL(text, opts = {}) {
	    const [vals, parsedZone] = parseSQL(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
	  }

	  /**
	   * Create an invalid DateTime.
	   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {DateTime}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidDateTimeError(invalid);
	    } else {
	      return new DateTime({ invalid });
	    }
	  }

	  /**
	   * Check if an object is an instance of DateTime. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDateTime(o) {
	    return (o && o.isLuxonDateTime) || false;
	  }

	  /**
	   * Produce the format string for a set of options
	   * @param formatOpts
	   * @param localeOpts
	   * @returns {string}
	   */
	  static parseFormatForOpts(formatOpts, localeOpts = {}) {
	    const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
	    return !tokenList ? null : tokenList.map((t) => (t ? t.val : null)).join("");
	  }

	  /**
	   * Produce the the fully expanded format token for the locale
	   * Does NOT quote characters, so quoted tokens will not round trip correctly
	   * @param fmt
	   * @param localeOpts
	   * @returns {string}
	   */
	  static expandFormat(fmt, localeOpts = {}) {
	    const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
	    return expanded.map((t) => t.val).join("");
	  }

	  // INFO

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
	   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
	   * @return {number}
	   */
	  get(unit) {
	    return this[unit];
	  }

	  /**
	   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
	   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
	   * * The DateTime was created by an operation on another invalid date
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get outputCalendar() {
	    return this.isValid ? this.loc.outputCalendar : null;
	  }

	  /**
	   * Get the time zone associated with this DateTime.
	   * @type {Zone}
	   */
	  get zone() {
	    return this._zone;
	  }

	  /**
	   * Get the name of the time zone.
	   * @type {string}
	   */
	  get zoneName() {
	    return this.isValid ? this.zone.name : null;
	  }

	  /**
	   * Get the year
	   * @example DateTime.local(2017, 5, 25).year //=> 2017
	   * @type {number}
	   */
	  get year() {
	    return this.isValid ? this.c.year : NaN;
	  }

	  /**
	   * Get the quarter
	   * @example DateTime.local(2017, 5, 25).quarter //=> 2
	   * @type {number}
	   */
	  get quarter() {
	    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
	  }

	  /**
	   * Get the month (1-12).
	   * @example DateTime.local(2017, 5, 25).month //=> 5
	   * @type {number}
	   */
	  get month() {
	    return this.isValid ? this.c.month : NaN;
	  }

	  /**
	   * Get the day of the month (1-30ish).
	   * @example DateTime.local(2017, 5, 25).day //=> 25
	   * @type {number}
	   */
	  get day() {
	    return this.isValid ? this.c.day : NaN;
	  }

	  /**
	   * Get the hour of the day (0-23).
	   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
	   * @type {number}
	   */
	  get hour() {
	    return this.isValid ? this.c.hour : NaN;
	  }

	  /**
	   * Get the minute of the hour (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
	   * @type {number}
	   */
	  get minute() {
	    return this.isValid ? this.c.minute : NaN;
	  }

	  /**
	   * Get the second of the minute (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
	   * @type {number}
	   */
	  get second() {
	    return this.isValid ? this.c.second : NaN;
	  }

	  /**
	   * Get the millisecond of the second (0-999).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
	   * @type {number}
	   */
	  get millisecond() {
	    return this.isValid ? this.c.millisecond : NaN;
	  }

	  /**
	   * Get the week year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
	   * @type {number}
	   */
	  get weekYear() {
	    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
	  }

	  /**
	   * Get the week number of the week year (1-52ish).
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
	   * @type {number}
	   */
	  get weekNumber() {
	    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
	  }

	  /**
	   * Get the day of the week.
	   * 1 is Monday and 7 is Sunday
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 11, 31).weekday //=> 4
	   * @type {number}
	   */
	  get weekday() {
	    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
	  }

	  /**
	   * Get the ordinal (meaning the day of the year)
	   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
	   * @type {number|DateTime}
	   */
	  get ordinal() {
	    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
	  }

	  /**
	   * Get the human readable short month name, such as 'Oct'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
	   * @type {string}
	   */
	  get monthShort() {
	    return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable long month name, such as 'October'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthLong //=> October
	   * @type {string}
	   */
	  get monthLong() {
	    return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable short weekday, such as 'Mon'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
	   * @type {string}
	   */
	  get weekdayShort() {
	    return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the human readable long weekday, such as 'Monday'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
	   * @type {string}
	   */
	  get weekdayLong() {
	    return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the UTC offset of this DateTime in minutes
	   * @example DateTime.now().offset //=> -240
	   * @example DateTime.utc().offset //=> 0
	   * @type {number}
	   */
	  get offset() {
	    return this.isValid ? +this.o : NaN;
	  }

	  /**
	   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameShort() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "short",
	        locale: this.locale,
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameLong() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "long",
	        locale: this.locale,
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get whether this zone's offset ever changes, as in a DST.
	   * @type {boolean}
	   */
	  get isOffsetFixed() {
	    return this.isValid ? this.zone.isUniversal : null;
	  }

	  /**
	   * Get whether the DateTime is in a DST.
	   * @type {boolean}
	   */
	  get isInDST() {
	    if (this.isOffsetFixed) {
	      return false;
	    } else {
	      return (
	        this.offset > this.set({ month: 1, day: 1 }).offset ||
	        this.offset > this.set({ month: 5 }).offset
	      );
	    }
	  }

	  /**
	   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
	   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
	   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
	   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
	   * @returns {DateTime[]}
	   */
	  getPossibleOffsets() {
	    if (!this.isValid || this.isOffsetFixed) {
	      return [this];
	    }
	    const dayMs = 86400000;
	    const minuteMs = 60000;
	    const localTS = objToLocalTS(this.c);
	    const oEarlier = this.zone.offset(localTS - dayMs);
	    const oLater = this.zone.offset(localTS + dayMs);

	    const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
	    const o2 = this.zone.offset(localTS - oLater * minuteMs);
	    if (o1 === o2) {
	      return [this];
	    }
	    const ts1 = localTS - o1 * minuteMs;
	    const ts2 = localTS - o2 * minuteMs;
	    const c1 = tsToObj(ts1, o1);
	    const c2 = tsToObj(ts2, o2);
	    if (
	      c1.hour === c2.hour &&
	      c1.minute === c2.minute &&
	      c1.second === c2.second &&
	      c1.millisecond === c2.millisecond
	    ) {
	      return [clone(this, { ts: ts1 }), clone(this, { ts: ts2 })];
	    }
	    return [this];
	  }

	  /**
	   * Returns true if this DateTime is in a leap year, false otherwise
	   * @example DateTime.local(2016).isInLeapYear //=> true
	   * @example DateTime.local(2013).isInLeapYear //=> false
	   * @type {boolean}
	   */
	  get isInLeapYear() {
	    return isLeapYear(this.year);
	  }

	  /**
	   * Returns the number of days in this DateTime's month
	   * @example DateTime.local(2016, 2).daysInMonth //=> 29
	   * @example DateTime.local(2016, 3).daysInMonth //=> 31
	   * @type {number}
	   */
	  get daysInMonth() {
	    return daysInMonth(this.year, this.month);
	  }

	  /**
	   * Returns the number of days in this DateTime's year
	   * @example DateTime.local(2016).daysInYear //=> 366
	   * @example DateTime.local(2013).daysInYear //=> 365
	   * @type {number}
	   */
	  get daysInYear() {
	    return this.isValid ? daysInYear(this.year) : NaN;
	  }

	  /**
	   * Returns the number of weeks in this DateTime's year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2004).weeksInWeekYear //=> 53
	   * @example DateTime.local(2013).weeksInWeekYear //=> 52
	   * @type {number}
	   */
	  get weeksInWeekYear() {
	    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
	  }

	  /**
	   * Returns the resolved Intl options for this DateTime.
	   * This is useful in understanding the behavior of formatting methods
	   * @param {Object} opts - the same options as toLocaleString
	   * @return {Object}
	   */
	  resolvedLocaleOptions(opts = {}) {
	    const { locale, numberingSystem, calendar } = Formatter.create(
	      this.loc.clone(opts),
	      opts
	    ).resolvedOptions(this);
	    return { locale, numberingSystem, outputCalendar: calendar };
	  }

	  // TRANSFORM

	  /**
	   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to {@link DateTime#setZone}('utc')
	   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
	   * @param {Object} [opts={}] - options to pass to `setZone()`
	   * @return {DateTime}
	   */
	  toUTC(offset = 0, opts = {}) {
	    return this.setZone(FixedOffsetZone.instance(offset), opts);
	  }

	  /**
	   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to `setZone('local')`
	   * @return {DateTime}
	   */
	  toLocal() {
	    return this.setZone(Settings.defaultZone);
	  }

	  /**
	   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
	   *
	   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
	   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
	   * @return {DateTime}
	   */
	  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
	    zone = normalizeZone(zone, Settings.defaultZone);
	    if (zone.equals(this.zone)) {
	      return this;
	    } else if (!zone.isValid) {
	      return DateTime.invalid(unsupportedZone(zone));
	    } else {
	      let newTS = this.ts;
	      if (keepLocalTime || keepCalendarTime) {
	        const offsetGuess = zone.offset(this.ts);
	        const asObj = this.toObject();
	        [newTS] = objToTS(asObj, offsetGuess, zone);
	      }
	      return clone(this, { ts: newTS, zone });
	    }
	  }

	  /**
	   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
	   * @param {Object} properties - the properties to set
	   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
	   * @return {DateTime}
	   */
	  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
	    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
	    return clone(this, { loc });
	  }

	  /**
	   * "Set" the locale. Returns a newly-constructed DateTime.
	   * Just a convenient alias for reconfigure({ locale })
	   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
	   * @return {DateTime}
	   */
	  setLocale(locale) {
	    return this.reconfigure({ locale });
	  }

	  /**
	   * "Set" the values of specified units. Returns a newly-constructed DateTime.
	   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dt.set({ year: 2017 })
	   * @example dt.set({ hour: 8, minute: 30 })
	   * @example dt.set({ weekday: 5 })
	   * @example dt.set({ year: 2005, ordinal: 234 })
	   * @return {DateTime}
	   */
	  set(values) {
	    if (!this.isValid) return this;

	    const normalized = normalizeObject(values, normalizeUnit),
	      settingWeekStuff =
	        !isUndefined(normalized.weekYear) ||
	        !isUndefined(normalized.weekNumber) ||
	        !isUndefined(normalized.weekday),
	      containsOrdinal = !isUndefined(normalized.ordinal),
	      containsGregorYear = !isUndefined(normalized.year),
	      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
	      containsGregor = containsGregorYear || containsGregorMD,
	      definiteWeekDef = normalized.weekYear || normalized.weekNumber;

	    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
	      throw new ConflictingSpecificationError(
	        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
	      );
	    }

	    if (containsGregorMD && containsOrdinal) {
	      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
	    }

	    let mixed;
	    if (settingWeekStuff) {
	      mixed = weekToGregorian({ ...gregorianToWeek(this.c), ...normalized });
	    } else if (!isUndefined(normalized.ordinal)) {
	      mixed = ordinalToGregorian({ ...gregorianToOrdinal(this.c), ...normalized });
	    } else {
	      mixed = { ...this.toObject(), ...normalized };

	      // if we didn't set the day but we ended up on an overflow date,
	      // use the last day of the right month
	      if (isUndefined(normalized.day)) {
	        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
	      }
	    }

	    const [ts, o] = objToTS(mixed, this.o, this.zone);
	    return clone(this, { ts, o });
	  }

	  /**
	   * Add a period of time to this DateTime and return the resulting DateTime
	   *
	   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @example DateTime.now().plus(123) //~> in 123 milliseconds
	   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
	   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
	   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
	   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
	   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
	   * @return {DateTime}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;
	    const dur = Duration.fromDurationLike(duration);
	    return clone(this, adjustTime(this, dur));
	  }

	  /**
	   * Subtract a period of time to this DateTime and return the resulting DateTime
	   * See {@link DateTime#plus}
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   @return {DateTime}
	   */
	  minus(duration) {
	    if (!this.isValid) return this;
	    const dur = Duration.fromDurationLike(duration).negate();
	    return clone(this, adjustTime(this, dur));
	  }

	  /**
	   * "Set" this DateTime to the beginning of a unit of time.
	   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
	   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
	   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
	   * @return {DateTime}
	   */
	  startOf(unit) {
	    if (!this.isValid) return this;
	    const o = {},
	      normalizedUnit = Duration.normalizeUnit(unit);
	    switch (normalizedUnit) {
	      case "years":
	        o.month = 1;
	      // falls through
	      case "quarters":
	      case "months":
	        o.day = 1;
	      // falls through
	      case "weeks":
	      case "days":
	        o.hour = 0;
	      // falls through
	      case "hours":
	        o.minute = 0;
	      // falls through
	      case "minutes":
	        o.second = 0;
	      // falls through
	      case "seconds":
	        o.millisecond = 0;
	        break;
	      // no default, invalid units throw in normalizeUnit()
	    }

	    if (normalizedUnit === "weeks") {
	      o.weekday = 1;
	    }

	    if (normalizedUnit === "quarters") {
	      const q = Math.ceil(this.month / 3);
	      o.month = (q - 1) * 3 + 1;
	    }

	    return this.set(o);
	  }

	  /**
	   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
	   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
	   * @return {DateTime}
	   */
	  endOf(unit) {
	    return this.isValid
	      ? this.plus({ [unit]: 1 })
	          .startOf(unit)
	          .minus(1)
	      : this;
	  }

	  // OUTPUT

	  /**
	   * Returns a string representation of this DateTime formatted according to the specified format string.
	   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
	   * @param {string} fmt - the format string
	   * @param {Object} opts - opts to override the configuration options on this DateTime
	   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
	   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
	   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
	   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
	      : INVALID;
	  }

	  /**
	   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
	   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
	   * of the DateTime in the assigned locale.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
	   * @param {Object} opts - opts to override the configuration options on this DateTime
	   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
	   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
	   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
	   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
	   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
	   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
	   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
	   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
	   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
	   * @return {string}
	   */
	  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this)
	      : INVALID;
	  }

	  /**
	   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
	   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
	   * @example DateTime.now().toLocaleParts(); //=> [
	   *                                   //=>   { type: 'day', value: '25' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'month', value: '05' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'year', value: '1982' }
	   *                                   //=> ]
	   */
	  toLocaleParts(opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
	      : [];
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
	   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
	   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
	   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
	   * @return {string}
	   */
	  toISO({
	    format = "extended",
	    suppressSeconds = false,
	    suppressMilliseconds = false,
	    includeOffset = true,
	    extendedZone = false,
	  } = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    const ext = format === "extended";

	    let c = toISODate(this, ext);
	    c += "T";
	    c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
	    return c;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's date component
	   * @param {Object} opts - options
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
	   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
	   * @return {string}
	   */
	  toISODate({ format = "extended" } = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    return toISODate(this, format === "extended");
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's week date
	   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
	   * @return {string}
	   */
	  toISOWeekDate() {
	    return toTechFormat(this, "kkkk-'W'WW-c");
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's time component
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
	   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
	   * @return {string}
	   */
	  toISOTime({
	    suppressMilliseconds = false,
	    suppressSeconds = false,
	    includeOffset = true,
	    includePrefix = false,
	    extendedZone = false,
	    format = "extended",
	  } = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    let c = includePrefix ? "T" : "";
	    return (
	      c +
	      toISOTime(
	        this,
	        format === "extended",
	        suppressSeconds,
	        suppressMilliseconds,
	        includeOffset,
	        extendedZone
	      )
	    );
	  }

	  /**
	   * Returns an RFC 2822-compatible string representation of this DateTime
	   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
	   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
	   * @return {string}
	   */
	  toRFC2822() {
	    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
	   * Specifically, the string conforms to RFC 1123.
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
	   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
	   * @return {string}
	   */
	  toHTTP() {
	    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Date
	   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
	   * @return {string}
	   */
	  toSQLDate() {
	    if (!this.isValid) {
	      return null;
	    }
	    return toISODate(this, true);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Time
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
	   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
	   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
	   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
	   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
	   * @return {string}
	   */
	  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
	    let fmt = "HH:mm:ss.SSS";

	    if (includeZone || includeOffset) {
	      if (includeOffsetSpace) {
	        fmt += " ";
	      }
	      if (includeZone) {
	        fmt += "z";
	      } else if (includeOffset) {
	        fmt += "ZZ";
	      }
	    }

	    return toTechFormat(this, fmt, true);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
	   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
	   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
	   * @return {string}
	   */
	  toSQL(opts = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for debugging
	   * @return {string}
	   */
	  toString() {
	    return this.isValid ? this.toISO() : INVALID;
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime.
	   * @return {number}
	   */
	  toMillis() {
	    return this.isValid ? this.ts : NaN;
	  }

	  /**
	   * Returns the epoch seconds of this DateTime.
	   * @return {number}
	   */
	  toSeconds() {
	    return this.isValid ? this.ts / 1000 : NaN;
	  }

	  /**
	   * Returns the epoch seconds (as a whole number) of this DateTime.
	   * @return {number}
	   */
	  toUnixInteger() {
	    return this.isValid ? Math.floor(this.ts / 1000) : NaN;
	  }

	  /**
	   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns a BSON serializable equivalent to this DateTime.
	   * @return {Date}
	   */
	  toBSON() {
	    return this.toJSDate();
	  }

	  /**
	   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
	   * @param opts - options for generating the object
	   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
	   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
	   * @return {Object}
	   */
	  toObject(opts = {}) {
	    if (!this.isValid) return {};

	    const base = { ...this.c };

	    if (opts.includeConfig) {
	      base.outputCalendar = this.outputCalendar;
	      base.numberingSystem = this.loc.numberingSystem;
	      base.locale = this.loc.locale;
	    }
	    return base;
	  }

	  /**
	   * Returns a JavaScript Date equivalent to this DateTime.
	   * @return {Date}
	   */
	  toJSDate() {
	    return new Date(this.isValid ? this.ts : NaN);
	  }

	  // COMPARE

	  /**
	   * Return the difference between two DateTimes as a Duration.
	   * @param {DateTime} otherDateTime - the DateTime to compare this one to
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example
	   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
	   *     i2 = DateTime.fromISO('1983-10-14T10:30');
	   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
	   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
	   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
	   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
	   * @return {Duration}
	   */
	  diff(otherDateTime, unit = "milliseconds", opts = {}) {
	    if (!this.isValid || !otherDateTime.isValid) {
	      return Duration.invalid("created by diffing an invalid DateTime");
	    }

	    const durOpts = { locale: this.locale, numberingSystem: this.numberingSystem, ...opts };

	    const units = maybeArray(unit).map(Duration.normalizeUnit),
	      otherIsLater = otherDateTime.valueOf() > this.valueOf(),
	      earlier = otherIsLater ? this : otherDateTime,
	      later = otherIsLater ? otherDateTime : this,
	      diffed = diff(earlier, later, units, durOpts);

	    return otherIsLater ? diffed.negate() : diffed;
	  }

	  /**
	   * Return the difference between this DateTime and right now.
	   * See {@link DateTime#diff}
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  diffNow(unit = "milliseconds", opts = {}) {
	    return this.diff(DateTime.now(), unit, opts);
	  }

	  /**
	   * Return an Interval spanning between this DateTime and another DateTime
	   * @param {DateTime} otherDateTime - the other end point of the Interval
	   * @return {Interval}
	   */
	  until(otherDateTime) {
	    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
	  }

	  /**
	   * Return whether this DateTime is in the same unit of time as another DateTime.
	   * Higher-order units must also be identical for this function to return `true`.
	   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
	   * @param {DateTime} otherDateTime - the other DateTime
	   * @param {string} unit - the unit of time to check sameness on
	   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
	   * @return {boolean}
	   */
	  hasSame(otherDateTime, unit) {
	    if (!this.isValid) return false;

	    const inputMs = otherDateTime.valueOf();
	    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
	    return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
	  }

	  /**
	   * Equality check
	   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
	   * To compare just the millisecond values, use `+dt1 === +dt2`.
	   * @param {DateTime} other - the other DateTime
	   * @return {boolean}
	   */
	  equals(other) {
	    return (
	      this.isValid &&
	      other.isValid &&
	      this.valueOf() === other.valueOf() &&
	      this.zone.equals(other.zone) &&
	      this.loc.equals(other.loc)
	    );
	  }

	  /**
	   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
	   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
	   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
	   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
	   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
	   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
	   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
	   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
	   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
	   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
	   */
	  toRelative(options = {}) {
	    if (!this.isValid) return null;
	    const base = options.base || DateTime.fromObject({}, { zone: this.zone }),
	      padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
	    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
	    let unit = options.unit;
	    if (Array.isArray(options.unit)) {
	      units = options.unit;
	      unit = undefined;
	    }
	    return diffRelative(base, this.plus(padding), {
	      ...options,
	      numeric: "always",
	      units,
	      unit,
	    });
	  }

	  /**
	   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
	   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
	   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
	   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
	   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
	   */
	  toRelativeCalendar(options = {}) {
	    if (!this.isValid) return null;

	    return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, {
	      ...options,
	      numeric: "auto",
	      units: ["years", "months", "days"],
	      calendary: true,
	    });
	  }

	  /**
	   * Return the min of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
	   * @return {DateTime} the min DateTime, or undefined if called with no argument
	   */
	  static min(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("min requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
	  }

	  /**
	   * Return the max of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
	   * @return {DateTime} the max DateTime, or undefined if called with no argument
	   */
	  static max(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("max requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
	  }

	  // MISC

	  /**
	   * Explain how a string would be parsed by fromFormat()
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see description)
	   * @param {Object} options - options taken by fromFormat()
	   * @return {Object}
	   */
	  static fromFormatExplain(text, fmt, options = {}) {
	    const { locale = null, numberingSystem = null } = options,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true,
	      });
	    return explainFromTokens(localeToUse, text, fmt);
	  }

	  /**
	   * @deprecated use fromFormatExplain instead
	   */
	  static fromStringExplain(text, fmt, options = {}) {
	    return DateTime.fromFormatExplain(text, fmt, options);
	  }

	  // FORMAT PRESETS

	  /**
	   * {@link DateTime#toLocaleString} format like 10/14/1983
	   * @type {Object}
	   */
	  static get DATE_SHORT() {
	    return DATE_SHORT;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED() {
	    return DATE_MED;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED_WITH_WEEKDAY() {
	    return DATE_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_FULL() {
	    return DATE_FULL;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_HUGE() {
	    return DATE_HUGE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_SIMPLE() {
	    return TIME_SIMPLE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SECONDS() {
	    return TIME_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SHORT_OFFSET() {
	    return TIME_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_LONG_OFFSET() {
	    return TIME_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_SIMPLE() {
	    return TIME_24_SIMPLE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SECONDS() {
	    return TIME_24_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SHORT_OFFSET() {
	    return TIME_24_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_LONG_OFFSET() {
	    return TIME_24_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT() {
	    return DATETIME_SHORT;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT_WITH_SECONDS() {
	    return DATETIME_SHORT_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED() {
	    return DATETIME_MED;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_SECONDS() {
	    return DATETIME_MED_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_WEEKDAY() {
	    return DATETIME_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL() {
	    return DATETIME_FULL;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL_WITH_SECONDS() {
	    return DATETIME_FULL_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE() {
	    return DATETIME_HUGE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE_WITH_SECONDS() {
	    return DATETIME_HUGE_WITH_SECONDS;
	  }
	}

	/**
	 * @private
	 */
	function friendlyDateTime(dateTimeish) {
	  if (DateTime.isDateTime(dateTimeish)) {
	    return dateTimeish;
	  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
	    return DateTime.fromJSDate(dateTimeish);
	  } else if (dateTimeish && typeof dateTimeish === "object") {
	    return DateTime.fromObject(dateTimeish);
	  } else {
	    throw new InvalidArgumentError(
	      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
	    );
	  }
	}

	////////////////////
	// Query Settings //
	////////////////////
	const DEFAULT_QUERY_SETTINGS = {
	    renderNullAs: "\\-",
	    taskCompletionTracking: false,
	    taskCompletionUseEmojiShorthand: false,
	    taskCompletionText: "completion",
	    taskCompletionDateFormat: "yyyy-MM-dd",
	    recursiveSubTaskCompletion: false,
	    warnOnEmptyResult: true,
	    refreshEnabled: true,
	    refreshInterval: 2500,
	    defaultDateFormat: "MMMM dd, yyyy",
	    defaultDateTimeFormat: "h:mm a - MMMM dd, yyyy",
	    maxRecursiveRenderDepth: 4,
	    tableIdColumnName: "File",
	    tableGroupColumnName: "Group",
	    showResultCount: true,
	};
	const DEFAULT_EXPORT_SETTINGS = {
	    allowHtml: true,
	};
	/** Default settings for dataview on install. */
	({
	    ...DEFAULT_QUERY_SETTINGS,
	    ...DEFAULT_EXPORT_SETTINGS,
	    ...{
	        inlineQueryPrefix: "=",
	        inlineJsQueryPrefix: "$=",
	        inlineQueriesInCodeblocks: true,
	        enableInlineDataview: true,
	        enableDataviewJs: false,
	        enableInlineDataviewJs: false,
	        prettyRenderInlineFields: true,
	        prettyRenderInlineFieldsInLivePreview: true,
	        dataviewJsKeyword: "dataviewjs",
	    },
	});

	/** Functional return type for error handling. */
	class Success {
	    value;
	    successful;
	    constructor(value) {
	        this.value = value;
	        this.successful = true;
	    }
	    map(f) {
	        return new Success(f(this.value));
	    }
	    flatMap(f) {
	        return f(this.value);
	    }
	    mapErr(f) {
	        return this;
	    }
	    bimap(succ, _fail) {
	        return this.map(succ);
	    }
	    orElse(_value) {
	        return this.value;
	    }
	    cast() {
	        return this;
	    }
	    orElseThrow(_message) {
	        return this.value;
	    }
	}
	/** Functional return type for error handling. */
	class Failure {
	    error;
	    successful;
	    constructor(error) {
	        this.error = error;
	        this.successful = false;
	    }
	    map(_f) {
	        return this;
	    }
	    flatMap(_f) {
	        return this;
	    }
	    mapErr(f) {
	        return new Failure(f(this.error));
	    }
	    bimap(_succ, fail) {
	        return this.mapErr(fail);
	    }
	    orElse(value) {
	        return value;
	    }
	    cast() {
	        return this;
	    }
	    orElseThrow(message) {
	        if (message)
	            throw new Error(message(this.error));
	        else
	            throw new Error("" + this.error);
	    }
	}
	/** Monadic 'Result' type which encapsulates whether a procedure succeeded or failed, as well as it's return value. */
	var Result;
	(function (Result) {
	    /** Construct a new success result wrapping the given value. */
	    function success(value) {
	        return new Success(value);
	    }
	    Result.success = success;
	    /** Construct a new failure value wrapping the given error. */
	    function failure(error) {
	        return new Failure(error);
	    }
	    Result.failure = failure;
	    /** Join two results with a bi-function and return a new result. */
	    function flatMap2(first, second, f) {
	        if (first.successful) {
	            if (second.successful)
	                return f(first.value, second.value);
	            else
	                return failure(second.error);
	        }
	        else {
	            return failure(first.error);
	        }
	    }
	    Result.flatMap2 = flatMap2;
	    /** Join two results with a bi-function and return a new result. */
	    function map2(first, second, f) {
	        return flatMap2(first, second, (a, b) => success(f(a, b)));
	    }
	    Result.map2 = map2;
	})(Result || (Result = {}));

	var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

	var parsimmon_umd_min = {exports: {}};

	parsimmon_umd_min.exports;

	(function (module, exports) {
		!function(n,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal$1,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var u=t[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e});},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0});},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){function e(n){if(!(this instanceof e))return new e(n);this._=n;}var u=e.prototype;function o(n,t){for(var r=0;r<n;r++)t(r);}function i(n,t,r){return function(n,t){o(t.length,function(r){n(t[r],r,t);});}(function(r,e,u){t=n(t,r,e,u);},r),t}function a(n,t){return i(function(t,r,e,u){return t.concat([n(r,e,u)])},[],t)}function f(n,t){var r={v:0,buf:t};return o(n,function(){var n;r={v:r.v<<1|(n=r.buf,n[0]>>7),buf:function(n){var t=i(function(n,t,r,e){return n.concat(r===e.length-1?Buffer.from([t,0]).readUInt16BE(0):e.readUInt16BE(r))},[],n);return Buffer.from(a(function(n){return (n<<1&65535)>>8},t))}(r.buf)};}),r}function c(){return "undefined"!=typeof Buffer}function s(){if(!c())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function l(n){s();var t=i(function(n,t){return n+t},0,n);if(t%8!=0)throw new Error("The bits ["+n.join(", ")+"] add up to "+t+" which is not an even number of bytes; the total should be divisible by 8");var r,u=t/8,o=(r=function(n){return n>48},i(function(n,t){return n||(r(t)?t:n)},null,n));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new e(function(t,r){var e=u+r;return e>t.length?x(r,u.toString()+" bytes"):b(e,i(function(n,t){var r=f(t,n.buf);return {coll:n.coll.concat(r.v),buf:r.buf}},{coll:[],buf:t.slice(r,e)},n).coll)})}function h(n,t){return new e(function(r,e){return s(),e+t>r.length?x(e,t+" bytes for "+n):b(e+t,r.slice(e,e+t))})}function p(n,t){if("number"!=typeof(r=t)||Math.floor(r)!==r||t<0||t>6)throw new Error(n+" requires integer length in range [0, 6].");var r;}function d(n){return p("uintBE",n),h("uintBE("+n+")",n).map(function(t){return t.readUIntBE(0,n)})}function v(n){return p("uintLE",n),h("uintLE("+n+")",n).map(function(t){return t.readUIntLE(0,n)})}function g(n){return p("intBE",n),h("intBE("+n+")",n).map(function(t){return t.readIntBE(0,n)})}function m(n){return p("intLE",n),h("intLE("+n+")",n).map(function(t){return t.readIntLE(0,n)})}function y(n){return n instanceof e}function E(n){return "[object Array]"==={}.toString.call(n)}function w(n){return c()&&Buffer.isBuffer(n)}function b(n,t){return {status:!0,index:n,value:t,furthest:-1,expected:[]}}function x(n,t){return E(t)||(t=[t]),{status:!1,index:-1,value:null,furthest:n,expected:t}}function B(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?function(n,t){if(function(){if(void 0!==e._supportsSet)return e._supportsSet;var n="undefined"!=typeof Set;return e._supportsSet=n,n}()&&Array.from){for(var r=new Set(n),u=0;u<t.length;u++)r.add(t[u]);var o=Array.from(r);return o.sort(),o}for(var i={},a=0;a<n.length;a++)i[n[a]]=!0;for(var f=0;f<t.length;f++)i[t[f]]=!0;var c=[];for(var s in i)({}).hasOwnProperty.call(i,s)&&c.push(s);return c.sort(),c}(n.expected,t.expected):t.expected;return {status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}var j={};function S(n,t){if(w(n))return {offset:t,line:-1,column:-1};n in j||(j[n]={});for(var r=j[n],e=0,u=0,o=0,i=t;i>=0;){if(i in r){e=r[i].line,0===o&&(o=r[i].lineStart);break}("\n"===n.charAt(i)||"\r"===n.charAt(i)&&"\n"!==n.charAt(i+1))&&(u++,0===o&&(o=i+1)),i--;}var a=e+u,f=t-o;return r[t]={line:a,lineStart:o},{offset:t,line:a+1,column:f+1}}function _(n){if(!y(n))throw new Error("not a parser: "+n)}function L(n,t){return "string"==typeof n?n.charAt(t):n[t]}function O(n){if("number"!=typeof n)throw new Error("not a number: "+n)}function k(n){if("function"!=typeof n)throw new Error("not a function: "+n)}function P(n){if("string"!=typeof n)throw new Error("not a string: "+n)}var q=2,A=3,I=8,F=5*I,M=4*I,z="  ";function R(n,t){return new Array(t+1).join(n)}function U(n,t,r){var e=t-n.length;return e<=0?n:R(r,e)+n}function W(n,t,r,e){return {from:n-t>0?n-t:0,to:n+r>e?e:n+r}}function D(n,t){var r,e,u,o,f,c=t.index,s=c.offset,l=1;if(s===n.length)return "Got the end of the input";if(w(n)){var h=s-s%I,p=s-h,d=W(h,F,M+I,n.length),v=a(function(n){return a(function(n){return U(n.toString(16),2,"0")},n)},function(n,t){var r=n.length,e=[],u=0;if(r<=t)return [n.slice()];for(var o=0;o<r;o++)e[u]||e.push([]),e[u].push(n[o]),(o+1)%t==0&&u++;return e}(n.slice(d.from,d.to).toJSON().data,I));o=function(n){return 0===n.from&&1===n.to?{from:n.from,to:n.to}:{from:n.from/I,to:Math.floor(n.to/I)}}(d),e=h/I,r=3*p,p>=4&&(r+=1),l=2,u=a(function(n){return n.length<=4?n.join(" "):n.slice(0,4).join(" ")+"  "+n.slice(4).join(" ")},v),(f=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(f=2);}else {var g=n.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,o=W(e,q,A,g.length),u=g.slice(o.from,o.to),f=o.to.toString().length;}var m=e-o.from;return w(n)&&(f=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(f=2),i(function(t,e,u){var i,a=u===m,c=a?"> ":z;return i=w(n)?U((8*(o.from+u)).toString(16),f,"0"):U((o.from+u+1).toString(),f," "),[].concat(t,[c+i+" | "+e],a?[z+R(" ",f)+" | "+U("",r," ")+R("^",l)]:[])},[],u).join("\n")}function N(n,t){return ["\n","-- PARSING FAILED "+R("-",50),"\n\n",D(n,t),"\n\n",(r=t.expected,1===r.length?"Expected:\n\n"+r[0]:"Expected one of the following: \n\n"+r.join(", ")),"\n"].join("");var r;}function G(n){return void 0!==n.flags?n.flags:[n.global?"g":"",n.ignoreCase?"i":"",n.multiline?"m":"",n.unicode?"u":"",n.sticky?"y":""].join("")}function C(){for(var n=[].slice.call(arguments),t=n.length,r=0;r<t;r+=1)_(n[r]);return e(function(r,e){for(var u,o=new Array(t),i=0;i<t;i+=1){if(!(u=B(n[i]._(r,e),u)).status)return u;o[i]=u.value,e=u.index;}return B(b(e,o),u)})}function J(){var n=[].slice.call(arguments);if(0===n.length)throw new Error("seqMap needs at least one argument");var t=n.pop();return k(t),C.apply(null,n).map(function(n){return t.apply(null,n)})}function T(){var n=[].slice.call(arguments),t=n.length;if(0===t)return Y("zero alternates");for(var r=0;r<t;r+=1)_(n[r]);return e(function(t,r){for(var e,u=0;u<n.length;u+=1)if((e=B(n[u]._(t,r),e)).status)return e;return e})}function V(n,t){return H(n,t).or(X([]))}function H(n,t){return _(n),_(t),J(n,t.then(n).many(),function(n,t){return [n].concat(t)})}function K(n){P(n);var t="'"+n+"'";return e(function(r,e){var u=e+n.length,o=r.slice(e,u);return o===n?b(u,o):x(e,t)})}function Q(n,t){!function(n){if(!(n instanceof RegExp))throw new Error("not a regexp: "+n);for(var t=G(n),r=0;r<t.length;r++){var e=t.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e&&"s"!==e)throw new Error('unsupported regexp flag "'+e+'": '+n)}}(n),arguments.length>=2?O(t):t=0;var r=function(n){return RegExp("^(?:"+n.source+")",G(n))}(n),u=""+n;return e(function(n,e){var o=r.exec(n.slice(e));if(o){if(0<=t&&t<=o.length){var i=o[0],a=o[t];return b(e+i.length,a)}return x(e,"valid match group (0 to "+o.length+") in "+u)}return x(e,u)})}function X(n){return e(function(t,r){return b(r,n)})}function Y(n){return e(function(t,r){return x(r,n)})}function Z(n){if(y(n))return e(function(t,r){var e=n._(t,r);return e.index=r,e.value="",e});if("string"==typeof n)return Z(K(n));if(n instanceof RegExp)return Z(Q(n));throw new Error("not a string, regexp, or parser: "+n)}function $(n){return _(n),e(function(t,r){var e=n._(t,r),u=t.slice(r,e.index);return e.status?x(r,'not "'+u+'"'):b(r,null)})}function nn(n){return k(n),e(function(t,r){var e=L(t,r);return r<t.length&&n(e)?b(r+1,e):x(r,"a character/byte matching "+n)})}function tn(n,t){arguments.length<2&&(t=n,n=void 0);var r=e(function(n,e){return r._=t()._,r._(n,e)});return n?r.desc(n):r}function rn(){return Y("fantasy-land/empty")}u.parse=function(n){if("string"!=typeof n&&!w(n))throw new Error(".parse must be called with a string or Buffer as its argument");var t,r=this.skip(an)._(n,0);return t=r.status?{status:!0,value:r.value}:{status:!1,index:S(n,r.furthest),expected:r.expected},delete j[n],t},u.tryParse=function(n){var t=this.parse(n);if(t.status)return t.value;var r=N(n,t),e=new Error(r);throw e.type="ParsimmonError",e.result=t,e},u.assert=function(n,t){return this.chain(function(r){return n(r)?X(r):Y(t)})},u.or=function(n){return T(this,n)},u.trim=function(n){return this.wrap(n,n)},u.wrap=function(n,t){return J(n,this,t,function(n,t){return t})},u.thru=function(n){return n(this)},u.then=function(n){return _(n),C(this,n).map(function(n){return n[1]})},u.many=function(){var n=this;return e(function(t,r){for(var e=[],u=void 0;;){if(!(u=B(n._(t,r),u)).status)return B(b(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value);}})},u.tieWith=function(n){return P(n),this.map(function(t){if(function(n){if(!E(n))throw new Error("not an array: "+n)}(t),t.length){P(t[0]);for(var r=t[0],e=1;e<t.length;e++)P(t[e]),r+=n+t[e];return r}return ""})},u.tie=function(){return this.tieWith("")},u.times=function(n,t){var r=this;return arguments.length<2&&(t=n),O(n),O(t),e(function(e,u){for(var o=[],i=void 0,a=void 0,f=0;f<n;f+=1){if(a=B(i=r._(e,u),a),!i.status)return a;u=i.index,o.push(i.value);}for(;f<t&&(a=B(i=r._(e,u),a),i.status);f+=1)u=i.index,o.push(i.value);return B(b(u,o),a)})},u.result=function(n){return this.map(function(){return n})},u.atMost=function(n){return this.times(0,n)},u.atLeast=function(n){return J(this.times(n),this.many(),function(n,t){return n.concat(t)})},u.map=function(n){k(n);var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(b(u.index,n(u.value)),u):u})},u.contramap=function(n){k(n);var t=this;return e(function(r,e){var u=t.parse(n(r.slice(e)));return u.status?b(e+r.length,u.value):u})},u.promap=function(n,t){return k(n),k(t),this.contramap(n).map(t)},u.skip=function(n){return C(this,n).map(function(n){return n[0]})},u.mark=function(){return J(en,this,en,function(n,t,r){return {start:n,value:t,end:r}})},u.node=function(n){return J(en,this,en,function(t,r,e){return {name:n,value:r,start:t,end:e}})},u.sepBy=function(n){return V(this,n)},u.sepBy1=function(n){return H(this,n)},u.lookahead=function(n){return this.skip(Z(n))},u.notFollowedBy=function(n){return this.skip($(n))},u.desc=function(n){E(n)||(n=[n]);var t=this;return e(function(r,e){var u=t._(r,e);return u.status||(u.expected=n),u})},u.fallback=function(n){return this.or(X(n))},u.ap=function(n){return J(n,this,function(n,t){return n(t)})},u.chain=function(n){var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(n(u.value)._(r,u.index),u):u})},u.concat=u.or,u.empty=rn,u.of=X,u["fantasy-land/ap"]=u.ap,u["fantasy-land/chain"]=u.chain,u["fantasy-land/concat"]=u.concat,u["fantasy-land/empty"]=u.empty,u["fantasy-land/of"]=u.of,u["fantasy-land/map"]=u.map;var en=e(function(n,t){return b(t,S(n,t))}),un=e(function(n,t){return t>=n.length?x(t,"any character/byte"):b(t+1,L(n,t))}),on=e(function(n,t){return b(n.length,n.slice(t))}),an=e(function(n,t){return t<n.length?x(t,"EOF"):b(t,null)}),fn=Q(/[0-9]/).desc("a digit"),cn=Q(/[0-9]*/).desc("optional digits"),sn=Q(/[a-z]/i).desc("a letter"),ln=Q(/[a-z]*/i).desc("optional letters"),hn=Q(/\s*/).desc("optional whitespace"),pn=Q(/\s+/).desc("whitespace"),dn=K("\r"),vn=K("\n"),gn=K("\r\n"),mn=T(gn,vn,dn).desc("newline"),yn=T(mn,an);e.all=on,e.alt=T,e.any=un,e.cr=dn,e.createLanguage=function(n){var t={};for(var r in n)({}).hasOwnProperty.call(n,r)&&function(r){t[r]=tn(function(){return n[r](t)});}(r);return t},e.crlf=gn,e.custom=function(n){return e(n(b,x))},e.digit=fn,e.digits=cn,e.empty=rn,e.end=yn,e.eof=an,e.fail=Y,e.formatError=N,e.index=en,e.isParser=y,e.lazy=tn,e.letter=sn,e.letters=ln,e.lf=vn,e.lookahead=Z,e.makeFailure=x,e.makeSuccess=b,e.newline=mn,e.noneOf=function(n){return nn(function(t){return n.indexOf(t)<0}).desc("none of '"+n+"'")},e.notFollowedBy=$,e.of=X,e.oneOf=function(n){for(var t=n.split(""),r=0;r<t.length;r++)t[r]="'"+t[r]+"'";return nn(function(t){return n.indexOf(t)>=0}).desc(t)},e.optWhitespace=hn,e.Parser=e,e.range=function(n,t){return nn(function(r){return n<=r&&r<=t}).desc(n+"-"+t)},e.regex=Q,e.regexp=Q,e.sepBy=V,e.sepBy1=H,e.seq=C,e.seqMap=J,e.seqObj=function(){for(var n,t={},r=0,u=(n=arguments,Array.prototype.slice.call(n)),o=u.length,i=0;i<o;i+=1){var a=u[i];if(!y(a)){if(E(a)&&2===a.length&&"string"==typeof a[0]&&y(a[1])){var f=a[0];if(Object.prototype.hasOwnProperty.call(t,f))throw new Error("seqObj: duplicate key "+f);t[f]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===r)throw new Error("seqObj expects at least one named parser, found zero");return e(function(n,t){for(var r,e={},i=0;i<o;i+=1){var a,f;if(E(u[i])?(a=u[i][0],f=u[i][1]):(a=null,f=u[i]),!(r=B(f._(n,t),r)).status)return r;a&&(e[a]=r.value),t=r.index;}return B(b(t,e),r)})},e.string=K,e.succeed=X,e.takeWhile=function(n){return k(n),e(function(t,r){for(var e=r;e<t.length&&n(L(t,e));)e++;return b(e,t.slice(r,e))})},e.test=nn,e.whitespace=pn,e["fantasy-land/empty"]=rn,e["fantasy-land/of"]=X,e.Binary={bitSeq:l,bitSeqObj:function(n){s();var t={},r=0,e=a(function(n){if(E(n)){var e=n;if(2!==e.length)throw new Error("["+e.join(", ")+"] should be length 2, got length "+e.length);if(P(e[0]),O(e[1]),Object.prototype.hasOwnProperty.call(t,e[0]))throw new Error("duplicate key in bitSeqObj: "+e[0]);return t[e[0]]=!0,r++,e}return O(n),[null,n]},n);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+n.join(", ")+"]");var u=a(function(n){return n[0]},e);return l(a(function(n){return n[1]},e)).map(function(n){return i(function(n,t){return null!==t[0]&&(n[t[0]]=t[1]),n},{},a(function(t,r){return [t,n[r]]},u))})},byte:function(n){if(s(),O(n),n>255)throw new Error("Value specified to byte constructor ("+n+"=0x"+n.toString(16)+") is larger in value than a single byte.");var t=(n>15?"0x":"0x0")+n.toString(16);return e(function(r,e){var u=L(r,e);return u===n?b(e+1,u):x(e,t)})},buffer:function(n){return h("buffer",n).map(function(n){return Buffer.from(n)})},encodedString:function(n,t){return h("string",t).map(function(t){return t.toString(n)})},uintBE:d,uint8BE:d(1),uint16BE:d(2),uint32BE:d(4),uintLE:v,uint8LE:v(1),uint16LE:v(2),uint32LE:v(4),intBE:g,int8BE:g(1),int16BE:g(2),int32BE:g(4),intLE:m,int8LE:m(1),int16LE:m(2),int32LE:m(4),floatBE:h("floatBE",4).map(function(n){return n.readFloatBE(0)}),floatLE:h("floatLE",4).map(function(n){return n.readFloatLE(0)}),doubleBE:h("doubleBE",8).map(function(n){return n.readDoubleBE(0)}),doubleLE:h("doubleLE",8).map(function(n){return n.readDoubleLE(0)})},n.exports=e;}])}); 
	} (parsimmon_umd_min, parsimmon_umd_min.exports));

	var parsimmon_umd_minExports = parsimmon_umd_min.exports;

	var emojiRegex = () => {
		// https://mths.be/emoji
		return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
	};

	/** Normalize a duration to all of the proper units. */
	function normalizeDuration(dur) {
	    if (dur === undefined || dur === null)
	        return dur;
	    return dur.shiftToAll().normalize();
	}
	/** Get the "title" for a file, by stripping other parts of the path as well as the extension. */
	function getFileTitle(path) {
	    if (path.includes("/"))
	        path = path.substring(path.lastIndexOf("/") + 1);
	    if (path.endsWith(".md"))
	        path = path.substring(0, path.length - 3);
	    return path;
	}
	/** A parsimmon parser which canonicalizes variable names while properly respecting emoji. */
	parsimmon_umd_minExports.alt(parsimmon_umd_minExports.regex(new RegExp(emojiRegex(), "")), parsimmon_umd_minExports.regex(/[0-9\p{Letter}_-]+/u).map(str => str.toLocaleLowerCase()), parsimmon_umd_minExports.whitespace.map(_ => "-"), parsimmon_umd_minExports.any.map(_ => ""))
	    .many()
	    .map(result => result.join(""));
	const HEADER_CANONICALIZER = parsimmon_umd_minExports.alt(parsimmon_umd_minExports.regex(new RegExp(emojiRegex(), "")), parsimmon_umd_minExports.regex(/[0-9\p{Letter}_-]+/u), parsimmon_umd_minExports.whitespace.map(_ => " "), parsimmon_umd_minExports.any.map(_ => " "))
	    .many()
	    .map(result => {
	    return result.join("").split(/\s+/).join(" ").trim();
	});
	/**
	 * Normalizes the text in a header to be something that is actually linkable to. This mimics
	 * how Obsidian does it's normalization, collapsing repeated spaces and stripping out control characters.
	 */
	function normalizeHeaderForLink(header) {
	    return HEADER_CANONICALIZER.tryParse(header);
	}
	/** Render a duration in a minimal format to save space. */
	function renderMinimalDuration(dur) {
	    dur = normalizeDuration(dur);
	    // toHuman outputs zero quantities e.g. "0 seconds"
	    dur = Duration.fromObject(Object.fromEntries(Object.entries(dur.toObject()).filter(([, quantity]) => quantity != 0)));
	    return dur.toHuman();
	}

	var Values;
	(function (Values) {
	    /** Convert an arbitrary value into a reasonable, Markdown-friendly string if possible. */
	    function toString(field, setting = DEFAULT_QUERY_SETTINGS, recursive = false) {
	        let wrapped = wrapValue(field);
	        if (!wrapped)
	            return setting.renderNullAs;
	        switch (wrapped.type) {
	            case "null":
	                return setting.renderNullAs;
	            case "string":
	                return wrapped.value;
	            case "number":
	            case "boolean":
	                return "" + wrapped.value;
	            case "html":
	                return wrapped.value.outerHTML;
	            case "widget":
	                return wrapped.value.markdown();
	            case "link":
	                return wrapped.value.markdown();
	            case "function":
	                return "<function>";
	            case "array":
	                let result = "";
	                if (recursive)
	                    result += "[";
	                result += wrapped.value.map(f => toString(f, setting, true)).join(", ");
	                if (recursive)
	                    result += "]";
	                return result;
	            case "object":
	                return ("{ " +
	                    Object.entries(wrapped.value)
	                        .map(e => e[0] + ": " + toString(e[1], setting, true))
	                        .join(", ") +
	                    " }");
	            case "date":
	                if (wrapped.value.second == 0 && wrapped.value.hour == 0 && wrapped.value.minute == 0) {
	                    return wrapped.value.toFormat(setting.defaultDateFormat);
	                }
	                return wrapped.value.toFormat(setting.defaultDateTimeFormat);
	            case "duration":
	                return renderMinimalDuration(wrapped.value);
	        }
	    }
	    Values.toString = toString;
	    /** Wrap a literal value so you can switch on it easily. */
	    function wrapValue(val) {
	        if (isNull(val))
	            return { type: "null", value: val };
	        else if (isNumber(val))
	            return { type: "number", value: val };
	        else if (isString(val))
	            return { type: "string", value: val };
	        else if (isBoolean(val))
	            return { type: "boolean", value: val };
	        else if (isDuration(val))
	            return { type: "duration", value: val };
	        else if (isDate(val))
	            return { type: "date", value: val };
	        else if (isWidget(val))
	            return { type: "widget", value: val };
	        else if (isArray(val))
	            return { type: "array", value: val };
	        else if (isLink(val))
	            return { type: "link", value: val };
	        else if (isFunction(val))
	            return { type: "function", value: val };
	        else if (isHtml(val))
	            return { type: "html", value: val };
	        else if (isObject(val))
	            return { type: "object", value: val };
	        else
	            return undefined;
	    }
	    Values.wrapValue = wrapValue;
	    /** Recursively map complex objects at the leaves. */
	    function mapLeaves(val, func) {
	        if (isObject(val)) {
	            let result = {};
	            for (let [key, value] of Object.entries(val))
	                result[key] = mapLeaves(value, func);
	            return result;
	        }
	        else if (isArray(val)) {
	            let result = [];
	            for (let value of val)
	                result.push(mapLeaves(value, func));
	            return result;
	        }
	        else {
	            return func(val);
	        }
	    }
	    Values.mapLeaves = mapLeaves;
	    /** Compare two arbitrary JavaScript values. Produces a total ordering over ANY possible dataview value. */
	    function compareValue(val1, val2, linkNormalizer) {
	        // Handle undefined/nulls first.
	        if (val1 === undefined)
	            val1 = null;
	        if (val2 === undefined)
	            val2 = null;
	        if (val1 === null && val2 === null)
	            return 0;
	        else if (val1 === null)
	            return -1;
	        else if (val2 === null)
	            return 1;
	        // A non-null value now which we can wrap & compare on.
	        let wrap1 = wrapValue(val1);
	        let wrap2 = wrapValue(val2);
	        if (wrap1 === undefined && wrap2 === undefined)
	            return 0;
	        else if (wrap1 === undefined)
	            return -1;
	        else if (wrap2 === undefined)
	            return 1;
	        // Short-circuit on different types or on reference equality.
	        if (wrap1.type != wrap2.type)
	            return wrap1.type.localeCompare(wrap2.type);
	        if (wrap1.value === wrap2.value)
	            return 0;
	        switch (wrap1.type) {
	            case "string":
	                return wrap1.value.localeCompare(wrap2.value);
	            case "number":
	                if (wrap1.value < wrap2.value)
	                    return -1;
	                else if (wrap1.value == wrap2.value)
	                    return 0;
	                return 1;
	            case "null":
	                return 0;
	            case "boolean":
	                if (wrap1.value == wrap2.value)
	                    return 0;
	                else
	                    return wrap1.value ? 1 : -1;
	            case "link":
	                let link1 = wrap1.value;
	                let link2 = wrap2.value;
	                let normalize = linkNormalizer ?? ((x) => x);
	                // We can't compare by file name or display, since that would break link equality. Compare by path.
	                let pathCompare = normalize(link1.path).localeCompare(normalize(link2.path));
	                if (pathCompare != 0)
	                    return pathCompare;
	                // Then compare by type.
	                let typeCompare = link1.type.localeCompare(link2.type);
	                if (typeCompare != 0)
	                    return typeCompare;
	                // Then compare by subpath existence.
	                if (link1.subpath && !link2.subpath)
	                    return 1;
	                if (!link1.subpath && link2.subpath)
	                    return -1;
	                if (!link1.subpath && !link2.subpath)
	                    return 0;
	                // Since both have a subpath, compare by subpath.
	                return (link1.subpath ?? "").localeCompare(link2.subpath ?? "");
	            case "date":
	                return wrap1.value < wrap2.value
	                    ? -1
	                    : wrap1.value.equals(wrap2.value)
	                        ? 0
	                        : 1;
	            case "duration":
	                return wrap1.value < wrap2.value
	                    ? -1
	                    : wrap1.value.equals(wrap2.value)
	                        ? 0
	                        : 1;
	            case "array":
	                let f1 = wrap1.value;
	                let f2 = wrap2.value;
	                for (let index = 0; index < Math.min(f1.length, f2.length); index++) {
	                    let comp = compareValue(f1[index], f2[index]);
	                    if (comp != 0)
	                        return comp;
	                }
	                return f1.length - f2.length;
	            case "object":
	                let o1 = wrap1.value;
	                let o2 = wrap2.value;
	                let k1 = Array.from(Object.keys(o1));
	                let k2 = Array.from(Object.keys(o2));
	                k1.sort();
	                k2.sort();
	                let keyCompare = compareValue(k1, k2);
	                if (keyCompare != 0)
	                    return keyCompare;
	                for (let key of k1) {
	                    let comp = compareValue(o1[key], o2[key]);
	                    if (comp != 0)
	                        return comp;
	                }
	                return 0;
	            case "widget":
	            case "html":
	            case "function":
	                return 0;
	        }
	    }
	    Values.compareValue = compareValue;
	    /** Find the corresponding Dataveiw type for an arbitrary value. */
	    function typeOf(val) {
	        return wrapValue(val)?.type;
	    }
	    Values.typeOf = typeOf;
	    /** Determine if the given value is "truthy" (i.e., is non-null and has data in it). */
	    function isTruthy(field) {
	        let wrapped = wrapValue(field);
	        if (!wrapped)
	            return false;
	        switch (wrapped.type) {
	            case "number":
	                return wrapped.value != 0;
	            case "string":
	                return wrapped.value.length > 0;
	            case "boolean":
	                return wrapped.value;
	            case "link":
	                return !!wrapped.value.path;
	            case "date":
	                return wrapped.value.toMillis() != 0;
	            case "duration":
	                return wrapped.value.as("seconds") != 0;
	            case "object":
	                return Object.keys(wrapped.value).length > 0;
	            case "array":
	                return wrapped.value.length > 0;
	            case "null":
	                return false;
	            case "html":
	            case "widget":
	            case "function":
	                return true;
	        }
	    }
	    Values.isTruthy = isTruthy;
	    /** Deep copy a field. */
	    function deepCopy(field) {
	        if (field === null || field === undefined)
	            return field;
	        if (Values.isArray(field)) {
	            return [].concat(field.map(v => deepCopy(v)));
	        }
	        else if (Values.isObject(field)) {
	            let result = {};
	            for (let [key, value] of Object.entries(field))
	                result[key] = deepCopy(value);
	            return result;
	        }
	        else {
	            return field;
	        }
	    }
	    Values.deepCopy = deepCopy;
	    function isString(val) {
	        return typeof val == "string";
	    }
	    Values.isString = isString;
	    function isNumber(val) {
	        return typeof val == "number";
	    }
	    Values.isNumber = isNumber;
	    function isDate(val) {
	        return val instanceof DateTime;
	    }
	    Values.isDate = isDate;
	    function isDuration(val) {
	        return val instanceof Duration;
	    }
	    Values.isDuration = isDuration;
	    function isNull(val) {
	        return val === null || val === undefined;
	    }
	    Values.isNull = isNull;
	    function isArray(val) {
	        return Array.isArray(val);
	    }
	    Values.isArray = isArray;
	    function isBoolean(val) {
	        return typeof val === "boolean";
	    }
	    Values.isBoolean = isBoolean;
	    function isLink(val) {
	        return val instanceof Link;
	    }
	    Values.isLink = isLink;
	    function isWidget(val) {
	        return val instanceof Widget;
	    }
	    Values.isWidget = isWidget;
	    function isHtml(val) {
	        if (typeof HTMLElement !== "undefined") {
	            return val instanceof HTMLElement;
	        }
	        else {
	            return false;
	        }
	    }
	    Values.isHtml = isHtml;
	    /** Checks if the given value is an object (and not any other dataview-recognized object-like type). */
	    function isObject(val) {
	        return (typeof val == "object" &&
	            !isHtml(val) &&
	            !isWidget(val) &&
	            !isArray(val) &&
	            !isDuration(val) &&
	            !isDate(val) &&
	            !isLink(val) &&
	            val !== undefined &&
	            !isNull(val));
	    }
	    Values.isObject = isObject;
	    function isFunction(val) {
	        return typeof val == "function";
	    }
	    Values.isFunction = isFunction;
	})(Values || (Values = {}));
	///////////////
	// Groupings //
	///////////////
	var Groupings;
	(function (Groupings) {
	    /** Determines if the given group entry is a standalone value, or a grouping of sub-entries. */
	    function isElementGroup(entry) {
	        return Values.isObject(entry) && Object.keys(entry).length == 2 && "key" in entry && "rows" in entry;
	    }
	    Groupings.isElementGroup = isElementGroup;
	    /** Determines if the given array is a grouping array. */
	    function isGrouping(entry) {
	        for (let element of entry)
	            if (!isElementGroup(element))
	                return false;
	        return true;
	    }
	    Groupings.isGrouping = isGrouping;
	    /** Count the total number of elements in a recursive grouping. */
	    function count(elements) {
	        if (isGrouping(elements)) {
	            let result = 0;
	            for (let subgroup of elements)
	                result += count(subgroup.rows);
	            return result;
	        }
	        else {
	            return elements.length;
	        }
	    }
	    Groupings.count = count;
	})(Groupings || (Groupings = {}));
	//////////
	// LINK //
	//////////
	/** The Obsidian 'link', used for uniquely describing a file, header, or block. */
	class Link {
	    /** The file path this link points to. */
	    path;
	    /** The display name associated with the link. */
	    display;
	    /** The block ID or header this link points to within a file, if relevant. */
	    subpath;
	    /** Is this link an embedded link (!)? */
	    embed;
	    /** The type of this link, which determines what 'subpath' refers to, if anything. */
	    type;
	    /** Create a link to a specific file. */
	    static file(path, embed = false, display) {
	        return new Link({
	            path,
	            embed,
	            display,
	            subpath: undefined,
	            type: "file",
	        });
	    }
	    static infer(linkpath, embed = false, display) {
	        if (linkpath.includes("#^")) {
	            let split = linkpath.split("#^");
	            return Link.block(split[0], split[1], embed, display);
	        }
	        else if (linkpath.includes("#")) {
	            let split = linkpath.split("#");
	            return Link.header(split[0], split[1], embed, display);
	        }
	        else
	            return Link.file(linkpath, embed, display);
	    }
	    /** Create a link to a specific file and header in that file. */
	    static header(path, header, embed, display) {
	        // Headers need to be normalized to alpha-numeric & with extra spacing removed.
	        return new Link({
	            path,
	            embed,
	            display,
	            subpath: normalizeHeaderForLink(header),
	            type: "header",
	        });
	    }
	    /** Create a link to a specific file and block in that file. */
	    static block(path, blockId, embed, display) {
	        return new Link({
	            path,
	            embed,
	            display,
	            subpath: blockId,
	            type: "block",
	        });
	    }
	    static fromObject(object) {
	        return new Link(object);
	    }
	    constructor(fields) {
	        Object.assign(this, fields);
	    }
	    /** Checks for link equality (i.e., that the links are pointing to the same exact location). */
	    equals(other) {
	        if (other == undefined || other == null)
	            return false;
	        return this.path == other.path && this.type == other.type && this.subpath == other.subpath;
	    }
	    /** Convert this link to it's markdown representation. */
	    toString() {
	        return this.markdown();
	    }
	    /** Convert this link to a raw object which is serialization-friendly. */
	    toObject() {
	        return { path: this.path, type: this.type, subpath: this.subpath, display: this.display, embed: this.embed };
	    }
	    /** Update this link with a new path. */
	    //@ts-ignore; error appeared after updating Obsidian to 0.15.4; it also updated other packages but didn't say which
	    withPath(path) {
	        return new Link(Object.assign({}, this, { path }));
	    }
	    /** Return a new link which points to the same location but with a new display value. */
	    withDisplay(display) {
	        return new Link(Object.assign({}, this, { display }));
	    }
	    /** Convert a file link into a link to a specific header. */
	    withHeader(header) {
	        return Link.header(this.path, header, this.embed, this.display);
	    }
	    /** Convert any link into a link to its file. */
	    toFile() {
	        return Link.file(this.path, this.embed, this.display);
	    }
	    /** Convert this link into an embedded link. */
	    toEmbed() {
	        if (this.embed) {
	            return this;
	        }
	        else {
	            let link = new Link(this);
	            link.embed = true;
	            return link;
	        }
	    }
	    /** Convert this link into a non-embedded link. */
	    fromEmbed() {
	        if (!this.embed) {
	            return this;
	        }
	        else {
	            let link = new Link(this);
	            link.embed = false;
	            return link;
	        }
	    }
	    /** Convert this link to markdown so it can be rendered. */
	    markdown() {
	        let result = (this.embed ? "!" : "") + "[[" + this.obsidianLink();
	        if (this.display) {
	            result += "|" + this.display;
	        }
	        else {
	            result += "|" + getFileTitle(this.path);
	            if (this.type == "header" || this.type == "block")
	                result += " > " + this.subpath;
	        }
	        result += "]]";
	        return result;
	    }
	    /** Convert the inner part of the link to something that Obsidian can open / understand. */
	    obsidianLink() {
	        const escaped = this.path.replaceAll("|", "\\|");
	        if (this.type == "header")
	            return escaped + "#" + this.subpath?.replaceAll("|", "\\|");
	        if (this.type == "block")
	            return escaped + "#^" + this.subpath?.replaceAll("|", "\\|");
	        else
	            return escaped;
	    }
	    /** The stripped name of the file this link points to. */
	    fileName() {
	        return getFileTitle(this.path).replace(".md", "");
	    }
	}
	/////////////////
	// WIDGET BASE //
	/////////////////
	/**
	 * A trivial base class which just defines the '$widget' identifier type. Subtypes of
	 * widget are responsible for adding whatever metadata is relevant. If you want your widget
	 * to have rendering functionality (which you probably do), you should extend `RenderWidget`.
	 */
	class Widget {
	    $widget;
	    constructor($widget) {
	        this.$widget = $widget;
	    }
	}
	/** A trivial widget which renders a (key, value) pair, and allows accessing the key and value. */
	class ListPairWidget extends Widget {
	    key;
	    value;
	    constructor(key, value) {
	        super("dataview:list-pair");
	        this.key = key;
	        this.value = value;
	    }
	    markdown() {
	        return `${Values.toString(this.key)}: ${Values.toString(this.value)}`;
	    }
	}
	/** A simple widget which renders an external link. */
	class ExternalLinkWidget extends Widget {
	    url;
	    display;
	    constructor(url, display) {
	        super("dataview:external-link");
	        this.url = url;
	        this.display = display;
	    }
	    markdown() {
	        return `[${this.display ?? this.url}](${this.url})`;
	    }
	}
	var Widgets;
	(function (Widgets) {
	    /** Create a list pair widget matching the given key and value. */
	    function listPair(key, value) {
	        return new ListPairWidget(key, value);
	    }
	    Widgets.listPair = listPair;
	    /** Create an external link widget which renders an external Obsidian link. */
	    function externalLink(url, display) {
	        return new ExternalLinkWidget(url, display);
	    }
	    Widgets.externalLink = externalLink;
	    /** Checks if the given widget is a list pair widget. */
	    function isListPair(widget) {
	        return widget.$widget === "dataview:list-pair";
	    }
	    Widgets.isListPair = isListPair;
	    function isExternalLink(widget) {
	        return widget.$widget === "dataview:external-link";
	    }
	    Widgets.isExternalLink = isExternalLink;
	    /** Determines if the given widget is any kind of built-in widget with special rendering handling. */
	    function isBuiltin(widget) {
	        return isListPair(widget) || isExternalLink(widget);
	    }
	    Widgets.isBuiltin = isBuiltin;
	})(Widgets || (Widgets = {}));

	/** Utility methods for creating & comparing fields. */
	var Fields;
	(function (Fields) {
	    function variable(name) {
	        return { type: "variable", name };
	    }
	    Fields.variable = variable;
	    function literal(value) {
	        return { type: "literal", value };
	    }
	    Fields.literal = literal;
	    function binaryOp(left, op, right) {
	        return { type: "binaryop", left, op, right };
	    }
	    Fields.binaryOp = binaryOp;
	    function index(obj, index) {
	        return { type: "index", object: obj, index };
	    }
	    Fields.index = index;
	    /** Converts a string in dot-notation-format into a variable which indexes. */
	    function indexVariable(name) {
	        let parts = name.split(".");
	        let result = Fields.variable(parts[0]);
	        for (let index = 1; index < parts.length; index++) {
	            result = Fields.index(result, Fields.literal(parts[index]));
	        }
	        return result;
	    }
	    Fields.indexVariable = indexVariable;
	    function lambda(args, value) {
	        return { type: "lambda", arguments: args, value };
	    }
	    Fields.lambda = lambda;
	    function func(func, args) {
	        return { type: "function", func, arguments: args };
	    }
	    Fields.func = func;
	    function list(values) {
	        return { type: "list", values };
	    }
	    Fields.list = list;
	    function object(values) {
	        return { type: "object", values };
	    }
	    Fields.object = object;
	    function negate(child) {
	        return { type: "negated", child };
	    }
	    Fields.negate = negate;
	    function isCompareOp(op) {
	        return op == "<=" || op == "<" || op == ">" || op == ">=" || op == "!=" || op == "=";
	    }
	    Fields.isCompareOp = isCompareOp;
	    Fields.NULL = Fields.literal(null);
	})(Fields || (Fields = {}));

	/** AST implementation for queries over data sources. */
	/** Utility functions for creating and manipulating sources. */
	var Sources;
	(function (Sources) {
	    /** Create a source which searches from a tag. */
	    function tag(tag) {
	        return { type: "tag", tag };
	    }
	    Sources.tag = tag;
	    /** Create a source which fetches from a CSV file. */
	    function csv(path) {
	        return { type: "csv", path };
	    }
	    Sources.csv = csv;
	    /** Create a source which searches for files under a folder prefix. */
	    function folder(prefix) {
	        return { type: "folder", folder: prefix };
	    }
	    Sources.folder = folder;
	    /** Create a source which searches for files which link to/from a given file. */
	    function link(file, incoming) {
	        return { type: "link", file, direction: incoming ? "incoming" : "outgoing" };
	    }
	    Sources.link = link;
	    /** Create a source which joins two sources by a logical operator (and/or). */
	    function binaryOp(left, op, right) {
	        return { type: "binaryop", left, op, right };
	    }
	    Sources.binaryOp = binaryOp;
	    /** Create a source which takes the intersection of two sources. */
	    function and(left, right) {
	        return { type: "binaryop", left, op: "&", right };
	    }
	    Sources.and = and;
	    /** Create a source which takes the union of two sources. */
	    function or(left, right) {
	        return { type: "binaryop", left, op: "|", right };
	    }
	    Sources.or = or;
	    /** Create a source which negates the underlying source. */
	    function negate(child) {
	        return { type: "negate", child };
	    }
	    Sources.negate = negate;
	    function empty() {
	        return { type: "empty" };
	    }
	    Sources.empty = empty;
	})(Sources || (Sources = {}));

	/** Emoji regex without any additional flags. */
	const EMOJI_REGEX = new RegExp(emojiRegex(), "");
	/** Provides a lookup table for unit durations of the given type. */
	const DURATION_TYPES = {
	    year: Duration.fromObject({ years: 1 }),
	    years: Duration.fromObject({ years: 1 }),
	    yr: Duration.fromObject({ years: 1 }),
	    yrs: Duration.fromObject({ years: 1 }),
	    month: Duration.fromObject({ months: 1 }),
	    months: Duration.fromObject({ months: 1 }),
	    mo: Duration.fromObject({ months: 1 }),
	    mos: Duration.fromObject({ months: 1 }),
	    week: Duration.fromObject({ weeks: 1 }),
	    weeks: Duration.fromObject({ weeks: 1 }),
	    wk: Duration.fromObject({ weeks: 1 }),
	    wks: Duration.fromObject({ weeks: 1 }),
	    w: Duration.fromObject({ weeks: 1 }),
	    day: Duration.fromObject({ days: 1 }),
	    days: Duration.fromObject({ days: 1 }),
	    d: Duration.fromObject({ days: 1 }),
	    hour: Duration.fromObject({ hours: 1 }),
	    hours: Duration.fromObject({ hours: 1 }),
	    hr: Duration.fromObject({ hours: 1 }),
	    hrs: Duration.fromObject({ hours: 1 }),
	    h: Duration.fromObject({ hours: 1 }),
	    minute: Duration.fromObject({ minutes: 1 }),
	    minutes: Duration.fromObject({ minutes: 1 }),
	    min: Duration.fromObject({ minutes: 1 }),
	    mins: Duration.fromObject({ minutes: 1 }),
	    m: Duration.fromObject({ minutes: 1 }),
	    second: Duration.fromObject({ seconds: 1 }),
	    seconds: Duration.fromObject({ seconds: 1 }),
	    sec: Duration.fromObject({ seconds: 1 }),
	    secs: Duration.fromObject({ seconds: 1 }),
	    s: Duration.fromObject({ seconds: 1 }),
	};
	/** Shorthand for common dates (relative to right now). */
	const DATE_SHORTHANDS = {
	    now: () => DateTime.local(),
	    today: () => DateTime.local().startOf("day"),
	    yesterday: () => DateTime.local()
	        .startOf("day")
	        .minus(Duration.fromObject({ days: 1 })),
	    tomorrow: () => DateTime.local()
	        .startOf("day")
	        .plus(Duration.fromObject({ days: 1 })),
	    sow: () => DateTime.local().startOf("week"),
	    "start-of-week": () => DateTime.local().startOf("week"),
	    eow: () => DateTime.local().endOf("week"),
	    "end-of-week": () => DateTime.local().endOf("week"),
	    soy: () => DateTime.local().startOf("year"),
	    "start-of-year": () => DateTime.local().startOf("year"),
	    eoy: () => DateTime.local().endOf("year"),
	    "end-of-year": () => DateTime.local().endOf("year"),
	    som: () => DateTime.local().startOf("month"),
	    "start-of-month": () => DateTime.local().startOf("month"),
	    eom: () => DateTime.local().endOf("month"),
	    "end-of-month": () => DateTime.local().endOf("month"),
	};
	/**
	 * Keywords which cannot be used as variables directly. Use `row.<thing>` if it is a variable you have defined and want
	 * to access.
	 */
	const KEYWORDS = ["FROM", "WHERE", "LIMIT", "GROUP", "FLATTEN"];
	///////////////
	// Utilities //
	///////////////
	/** Split on unescaped pipes in an inner link. */
	function splitOnUnescapedPipe(link) {
	    let pipe = -1;
	    while ((pipe = link.indexOf("|", pipe + 1)) >= 0) {
	        if (pipe > 0 && link[pipe - 1] == "\\")
	            continue;
	        return [link.substring(0, pipe).replace(/\\\|/g, "|"), link.substring(pipe + 1)];
	    }
	    return [link.replace(/\\\|/g, "|"), undefined];
	}
	/** Attempt to parse the inside of a link to pull out display name, subpath, etc. */
	function parseInnerLink(rawlink) {
	    let [link, display] = splitOnUnescapedPipe(rawlink);
	    return Link.infer(link, false, display);
	}
	/** Create a left-associative binary parser which parses the given sub-element and separator. Handles whitespace. */
	function createBinaryParser(child, sep, combine) {
	    return parsimmon_umd_minExports.seqMap(child, parsimmon_umd_minExports.seq(parsimmon_umd_minExports.optWhitespace, sep, parsimmon_umd_minExports.optWhitespace, child).many(), (first, rest) => {
	        if (rest.length == 0)
	            return first;
	        let node = combine(first, rest[0][1], rest[0][3]);
	        for (let index = 1; index < rest.length; index++) {
	            node = combine(node, rest[index][1], rest[index][3]);
	        }
	        return node;
	    });
	}
	function chainOpt(base, ...funcs) {
	    return parsimmon_umd_minExports.custom((success, failure) => {
	        return (input, i) => {
	            let result = base._(input, i);
	            if (!result.status)
	                return result;
	            for (let func of funcs) {
	                let next = func(result.value)._(input, result.index);
	                if (!next.status)
	                    return result;
	                result = next;
	            }
	            return result;
	        };
	    });
	}
	const EXPRESSION = parsimmon_umd_minExports.createLanguage({
	    // A floating point number; the decimal point is optional.
	    number: q => parsimmon_umd_minExports.regexp(/-?[0-9]+(\.[0-9]+)?/)
	        .map(str => Number.parseFloat(str))
	        .desc("number"),
	    // A quote-surrounded string which supports escape characters ('\').
	    string: q => parsimmon_umd_minExports.string('"')
	        .then(parsimmon_umd_minExports.alt(q.escapeCharacter, parsimmon_umd_minExports.noneOf('"\\'))
	        .atLeast(0)
	        .map(chars => chars.join("")))
	        .skip(parsimmon_umd_minExports.string('"'))
	        .desc("string"),
	    escapeCharacter: _ => parsimmon_umd_minExports.string("\\")
	        .then(parsimmon_umd_minExports.any)
	        .map(escaped => {
	        // If we are escaping a backslash or a quote, pass in on in escaped form
	        if (escaped === '"')
	            return '"';
	        if (escaped === "\\")
	            return "\\";
	        else
	            return "\\" + escaped;
	    }),
	    // A boolean true/false value.
	    bool: _ => parsimmon_umd_minExports.regexp(/true|false|True|False/)
	        .map(str => str.toLowerCase() == "true")
	        .desc("boolean ('true' or 'false')"),
	    // A tag of the form '#stuff/hello-there'.
	    tag: _ => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("#"), parsimmon_umd_minExports.alt(parsimmon_umd_minExports.regexp(/[^\u2000-\u206F\u2E00-\u2E7F'!"#$%&()*+,.:;<=>?@^`{|}~\[\]\\\s]/).desc("text")).many(), (start, rest) => start + rest.join("")).desc("tag ('#hello/stuff')"),
	    // A variable identifier, which is alphanumeric and must start with a letter or... emoji.
	    identifier: _ => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.alt(parsimmon_umd_minExports.regexp(/\p{Letter}/u), parsimmon_umd_minExports.regexp(EMOJI_REGEX).desc("text")), parsimmon_umd_minExports.alt(parsimmon_umd_minExports.regexp(/[0-9\p{Letter}_-]/u), parsimmon_umd_minExports.regexp(EMOJI_REGEX).desc("text")).many(), (first, rest) => first + rest.join("")).desc("variable identifier"),
	    // An Obsidian link of the form [[<link>]].
	    link: _ => parsimmon_umd_minExports.regexp(/\[\[([^\[\]]*?)\]\]/u, 1)
	        .map(linkInner => parseInnerLink(linkInner))
	        .desc("file link"),
	    // An embeddable link which can start with '!'. This overlaps with the normal negation operator, so it is only
	    // provided for metadata parsing.
	    embedLink: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("!").atMost(1), q.link, (p, l) => {
	        if (p.length > 0)
	            l.embed = true;
	        return l;
	    }).desc("file link"),
	    // Binary plus or minus operator.
	    binaryPlusMinus: _ => parsimmon_umd_minExports.regexp(/\+|-/)
	        .map(str => str)
	        .desc("'+' or '-'"),
	    // Binary times or divide operator.
	    binaryMulDiv: _ => parsimmon_umd_minExports.regexp(/\*|\/|%/)
	        .map(str => str)
	        .desc("'*' or '/' or '%'"),
	    // Binary comparison operator.
	    binaryCompareOp: _ => parsimmon_umd_minExports.regexp(/>=|<=|!=|>|<|=/)
	        .map(str => str)
	        .desc("'>=' or '<=' or '!=' or '=' or '>' or '<'"),
	    // Binary boolean combination operator.
	    binaryBooleanOp: _ => parsimmon_umd_minExports.regexp(/and|or|&|\|/i)
	        .map(str => {
	        if (str.toLowerCase() == "and")
	            return "&";
	        else if (str.toLowerCase() == "or")
	            return "|";
	        else
	            return str;
	    })
	        .desc("'and' or 'or'"),
	    // A date which can be YYYY-MM[-DDTHH:mm:ss].
	    rootDate: _ => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/\d{4}/), parsimmon_umd_minExports.string("-"), parsimmon_umd_minExports.regexp(/\d{2}/), (year, _, month) => {
	        return DateTime.fromObject({ year: Number.parseInt(year), month: Number.parseInt(month) });
	    }).desc("date in format YYYY-MM[-DDTHH-MM-SS.MS]"),
	    dateShorthand: _ => parsimmon_umd_minExports.alt(...Object.keys(DATE_SHORTHANDS)
	        .sort((a, b) => b.length - a.length)
	        .map(parsimmon_umd_minExports.string)),
	    date: q => chainOpt(q.rootDate, (ym) => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("-"), parsimmon_umd_minExports.regexp(/\d{2}/), (_, day) => ym.set({ day: Number.parseInt(day) })), (ymd) => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("T"), parsimmon_umd_minExports.regexp(/\d{2}/), (_, hour) => ymd.set({ hour: Number.parseInt(hour) })), (ymdh) => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string(":"), parsimmon_umd_minExports.regexp(/\d{2}/), (_, minute) => ymdh.set({ minute: Number.parseInt(minute) })), (ymdhm) => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string(":"), parsimmon_umd_minExports.regexp(/\d{2}/), (_, second) => ymdhm.set({ second: Number.parseInt(second) })), (ymdhms) => parsimmon_umd_minExports.alt(parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("."), parsimmon_umd_minExports.regexp(/\d{3}/), (_, millisecond) => ymdhms.set({ millisecond: Number.parseInt(millisecond) })), parsimmon_umd_minExports.succeed(ymdhms) // pass
	    ), (dt) => parsimmon_umd_minExports.alt(parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("+").or(parsimmon_umd_minExports.string("-")), parsimmon_umd_minExports.regexp(/\d{1,2}(:\d{2})?/), (pm, hr) => dt.setZone("UTC" + pm + hr, { keepLocalTime: true })), parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("Z"), () => dt.setZone("utc", { keepLocalTime: true })), parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("["), parsimmon_umd_minExports.regexp(/[0-9A-Za-z+-\/]+/u), parsimmon_umd_minExports.string("]"), (_a, zone, _b) => dt.setZone(zone, { keepLocalTime: true }))))
	        .assert((dt) => dt.isValid, "valid date")
	        .desc("date in format YYYY-MM[-DDTHH-MM-SS.MS]"),
	    // A date, plus various shorthand times of day it could be.
	    datePlus: q => parsimmon_umd_minExports.alt(q.dateShorthand.map(d => DATE_SHORTHANDS[d]()), q.date).desc("date in format YYYY-MM[-DDTHH-MM-SS.MS] or in shorthand"),
	    // A duration of time.
	    durationType: _ => parsimmon_umd_minExports.alt(...Object.keys(DURATION_TYPES)
	        .sort((a, b) => b.length - a.length)
	        .map(parsimmon_umd_minExports.string)),
	    duration: q => parsimmon_umd_minExports.seqMap(q.number, parsimmon_umd_minExports.optWhitespace, q.durationType, (count, _, t) => DURATION_TYPES[t].mapUnits(x => x * count))
	        .sepBy1(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace).or(parsimmon_umd_minExports.optWhitespace))
	        .map(durations => durations.reduce((p, c) => p.plus(c)))
	        .desc("duration like 4hr2min"),
	    // A raw null value.
	    rawNull: _ => parsimmon_umd_minExports.string("null"),
	    // Source parsing.
	    tagSource: q => q.tag.map(tag => Sources.tag(tag)),
	    csvSource: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("csv(").skip(parsimmon_umd_minExports.optWhitespace), q.string, parsimmon_umd_minExports.string(")"), (_1, path, _2) => Sources.csv(path)),
	    linkIncomingSource: q => q.link.map(link => Sources.link(link.path, true)),
	    linkOutgoingSource: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("outgoing(").skip(parsimmon_umd_minExports.optWhitespace), q.link, parsimmon_umd_minExports.string(")"), (_1, link, _2) => Sources.link(link.path, false)),
	    folderSource: q => q.string.map(str => Sources.folder(str)),
	    parensSource: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("("), parsimmon_umd_minExports.optWhitespace, q.source, parsimmon_umd_minExports.optWhitespace, parsimmon_umd_minExports.string(")"), (_1, _2, field, _3, _4) => field),
	    negateSource: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.alt(parsimmon_umd_minExports.string("-"), parsimmon_umd_minExports.string("!")), q.atomSource, (_, source) => Sources.negate(source)),
	    atomSource: q => parsimmon_umd_minExports.alt(q.parensSource, q.negateSource, q.linkOutgoingSource, q.linkIncomingSource, q.folderSource, q.tagSource, q.csvSource),
	    binaryOpSource: q => createBinaryParser(q.atomSource, q.binaryBooleanOp.map(s => s), Sources.binaryOp),
	    source: q => q.binaryOpSource,
	    // Field parsing.
	    variableField: q => q.identifier
	        .chain(r => {
	        if (KEYWORDS.includes(r.toUpperCase())) {
	            return parsimmon_umd_minExports.fail("Variable fields cannot be a keyword (" + KEYWORDS.join(" or ") + ")");
	        }
	        else {
	            return parsimmon_umd_minExports.succeed(Fields.variable(r));
	        }
	    })
	        .desc("variable"),
	    numberField: q => q.number.map(val => Fields.literal(val)).desc("number"),
	    stringField: q => q.string.map(val => Fields.literal(val)).desc("string"),
	    boolField: q => q.bool.map(val => Fields.literal(val)).desc("boolean"),
	    dateField: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("date("), parsimmon_umd_minExports.optWhitespace, q.datePlus, parsimmon_umd_minExports.optWhitespace, parsimmon_umd_minExports.string(")"), (prefix, _1, date, _2, postfix) => Fields.literal(date)).desc("date"),
	    durationField: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("dur("), parsimmon_umd_minExports.optWhitespace, q.duration, parsimmon_umd_minExports.optWhitespace, parsimmon_umd_minExports.string(")"), (prefix, _1, dur, _2, postfix) => Fields.literal(dur)).desc("duration"),
	    nullField: q => q.rawNull.map(_ => Fields.NULL),
	    linkField: q => q.link.map(f => Fields.literal(f)),
	    listField: q => q.field
	        .sepBy(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace))
	        .wrap(parsimmon_umd_minExports.string("[").skip(parsimmon_umd_minExports.optWhitespace), parsimmon_umd_minExports.optWhitespace.then(parsimmon_umd_minExports.string("]")))
	        .map(l => Fields.list(l))
	        .desc("list ('[1, 2, 3]')"),
	    objectField: q => parsimmon_umd_minExports.seqMap(q.identifier.or(q.string), parsimmon_umd_minExports.string(":").trim(parsimmon_umd_minExports.optWhitespace), q.field, (name, _sep, value) => {
	        return { name, value };
	    })
	        .sepBy(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace))
	        .wrap(parsimmon_umd_minExports.string("{").skip(parsimmon_umd_minExports.optWhitespace), parsimmon_umd_minExports.optWhitespace.then(parsimmon_umd_minExports.string("}")))
	        .map(vals => {
	        let res = {};
	        for (let entry of vals)
	            res[entry.name] = entry.value;
	        return Fields.object(res);
	    })
	        .desc("object ('{ a: 1, b: 2 }')"),
	    atomInlineField: q => parsimmon_umd_minExports.alt(q.date, q.duration.map(d => normalizeDuration(d)), q.string, q.tag, q.embedLink, q.bool, q.number, q.rawNull),
	    inlineFieldList: q => q.atomInlineField.sepBy(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace).lookahead(q.atomInlineField)),
	    inlineField: q => parsimmon_umd_minExports.alt(parsimmon_umd_minExports.seqMap(q.atomInlineField, parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace), q.inlineFieldList, (f, _s, l) => [f].concat(l)), q.atomInlineField),
	    atomField: q => parsimmon_umd_minExports.alt(
	    // Place embed links above negated fields as they are the special parser case '![[thing]]' and are generally unambigious.
	    q.embedLink.map(l => Fields.literal(l)), q.negatedField, q.linkField, q.listField, q.objectField, q.lambdaField, q.parensField, q.boolField, q.numberField, q.stringField, q.dateField, q.durationField, q.nullField, q.variableField),
	    indexField: q => parsimmon_umd_minExports.seqMap(q.atomField, parsimmon_umd_minExports.alt(q.dotPostfix, q.indexPostfix, q.functionPostfix).many(), (obj, postfixes) => {
	        let result = obj;
	        for (let post of postfixes) {
	            switch (post.type) {
	                case "dot":
	                    result = Fields.index(result, Fields.literal(post.field));
	                    break;
	                case "index":
	                    result = Fields.index(result, post.field);
	                    break;
	                case "function":
	                    result = Fields.func(result, post.fields);
	                    break;
	            }
	        }
	        return result;
	    }),
	    negatedField: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("!"), q.indexField, (_, field) => Fields.negate(field)).desc("negated field"),
	    parensField: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("("), parsimmon_umd_minExports.optWhitespace, q.field, parsimmon_umd_minExports.optWhitespace, parsimmon_umd_minExports.string(")"), (_1, _2, field, _3, _4) => field),
	    lambdaField: q => parsimmon_umd_minExports.seqMap(q.identifier
	        .sepBy(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace))
	        .wrap(parsimmon_umd_minExports.string("(").trim(parsimmon_umd_minExports.optWhitespace), parsimmon_umd_minExports.string(")").trim(parsimmon_umd_minExports.optWhitespace)), parsimmon_umd_minExports.string("=>").trim(parsimmon_umd_minExports.optWhitespace), q.field, (ident, _ignore, value) => {
	        return { type: "lambda", arguments: ident, value };
	    }),
	    dotPostfix: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("."), q.identifier, (_, field) => {
	        return { type: "dot", field: field };
	    }),
	    indexPostfix: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("["), parsimmon_umd_minExports.optWhitespace, q.field, parsimmon_umd_minExports.optWhitespace, parsimmon_umd_minExports.string("]"), (_, _2, field, _3, _4) => {
	        return { type: "index", field };
	    }),
	    functionPostfix: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.string("("), parsimmon_umd_minExports.optWhitespace, q.field.sepBy(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace)), parsimmon_umd_minExports.optWhitespace, parsimmon_umd_minExports.string(")"), (_, _1, fields, _2, _3) => {
	        return { type: "function", fields };
	    }),
	    // The precedence hierarchy of operators - multiply/divide, add/subtract, compare, and then boolean operations.
	    binaryMulDivField: q => createBinaryParser(q.indexField, q.binaryMulDiv, Fields.binaryOp),
	    binaryPlusMinusField: q => createBinaryParser(q.binaryMulDivField, q.binaryPlusMinus, Fields.binaryOp),
	    binaryCompareField: q => createBinaryParser(q.binaryPlusMinusField, q.binaryCompareOp, Fields.binaryOp),
	    binaryBooleanField: q => createBinaryParser(q.binaryCompareField, q.binaryBooleanOp, Fields.binaryOp),
	    binaryOpField: q => q.binaryBooleanField,
	    field: q => q.binaryOpField,
	});
	/**
	 * Attempt to parse a field from the given text, returning a string error if the
	 * parse failed.
	 */
	function parseField(text) {
	    try {
	        return Result.success(EXPRESSION.field.tryParse(text));
	    }
	    catch (error) {
	        return Result.failure("" + error);
	    }
	}

	/** Utility functions for quickly creating fields. */
	var QueryFields;
	(function (QueryFields) {
	    function named(name, field) {
	        return { name, field };
	    }
	    QueryFields.named = named;
	    function sortBy(field, dir) {
	        return { field, direction: dir };
	    }
	    QueryFields.sortBy = sortBy;
	})(QueryFields || (QueryFields = {}));

	/** Return a new parser which executes the underlying parser and returns it's raw string representation. */
	function captureRaw(base) {
	    return parsimmon_umd_minExports.custom((success, failure) => {
	        return (input, i) => {
	            let result = base._(input, i);
	            if (!result.status)
	                return result;
	            return Object.assign({}, result, { value: [result.value, input.substring(i, result.index)] });
	        };
	    });
	}
	/** Strip newlines and excess whitespace out of text. */
	function stripNewlines(text) {
	    return text
	        .split(/[\r\n]+/)
	        .map(t => t.trim())
	        .join("");
	}
	/** Given `parser`, return the parser that returns `if_eof()` if EOF is found,
	 * otherwise `parser` preceded by (non-optional) whitespace */
	function precededByWhitespaceIfNotEof(if_eof, parser) {
	    return parsimmon_umd_minExports.eof.map(if_eof).or(parsimmon_umd_minExports.whitespace.then(parser));
	}
	/** A parsimmon-powered parser-combinator implementation of the query language. */
	const QUERY_LANGUAGE = parsimmon_umd_minExports.createLanguage({
	    // Simple atom parsing, like words, identifiers, numbers.
	    queryType: q => parsimmon_umd_minExports.alt(parsimmon_umd_minExports.regexp(/TABLE|LIST|TASK|CALENDAR/i))
	        .map(str => str.toLowerCase())
	        .desc("query type ('TABLE', 'LIST', 'TASK', or 'CALENDAR')"),
	    explicitNamedField: q => parsimmon_umd_minExports.seqMap(EXPRESSION.field.skip(parsimmon_umd_minExports.whitespace), parsimmon_umd_minExports.regexp(/AS/i).skip(parsimmon_umd_minExports.whitespace), EXPRESSION.identifier.or(EXPRESSION.string), (field, _as, ident) => QueryFields.named(ident, field)),
	    comment: () => parsimmon_umd_minExports.Parser((input, i) => {
	        // Parse a comment, which is a line starting with //.
	        let line = input.substring(i);
	        if (!line.startsWith("//"))
	            return parsimmon_umd_minExports.makeFailure(i, "Not a comment");
	        // The comment ends at the end of the line.
	        line = line.split("\n")[0];
	        let comment = line.substring(2).trim();
	        return parsimmon_umd_minExports.makeSuccess(i + line.length, comment);
	    }),
	    namedField: q => parsimmon_umd_minExports.alt(q.explicitNamedField, captureRaw(EXPRESSION.field).map(([value, text]) => QueryFields.named(stripNewlines(text), value))),
	    sortField: q => parsimmon_umd_minExports.seqMap(EXPRESSION.field.skip(parsimmon_umd_minExports.optWhitespace), parsimmon_umd_minExports.regexp(/ASCENDING|DESCENDING|ASC|DESC/i).atMost(1), (field, dir) => {
	        let direction = dir.length == 0 ? "ascending" : dir[0].toLowerCase();
	        if (direction == "desc")
	            direction = "descending";
	        if (direction == "asc")
	            direction = "ascending";
	        return {
	            field: field,
	            direction: direction,
	        };
	    }),
	    headerClause: q => q.queryType
	        .chain(type => {
	        switch (type) {
	            case "table": {
	                return precededByWhitespaceIfNotEof(() => ({ type, fields: [], showId: true }), parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/WITHOUT\s+ID/i)
	                    .skip(parsimmon_umd_minExports.optWhitespace)
	                    .atMost(1), parsimmon_umd_minExports.sepBy(q.namedField, parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace)), (withoutId, fields) => {
	                    return { type, fields, showId: withoutId.length == 0 };
	                }));
	            }
	            case "list":
	                return precededByWhitespaceIfNotEof(() => ({ type, format: undefined, showId: true }), parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/WITHOUT\s+ID/i)
	                    .skip(parsimmon_umd_minExports.optWhitespace)
	                    .atMost(1), EXPRESSION.field.atMost(1), (withoutId, format) => {
	                    return {
	                        type,
	                        format: format.length == 1 ? format[0] : undefined,
	                        showId: withoutId.length == 0,
	                    };
	                }));
	            case "task":
	                return parsimmon_umd_minExports.succeed({ type });
	            case "calendar":
	                return parsimmon_umd_minExports.whitespace.then(parsimmon_umd_minExports.seqMap(q.namedField, field => {
	                    return {
	                        type,
	                        showId: true,
	                        field,
	                    };
	                }));
	            default:
	                return parsimmon_umd_minExports.fail(`Unrecognized query type '${type}'`);
	        }
	    })
	        .desc("TABLE or LIST or TASK or CALENDAR"),
	    fromClause: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/FROM/i), parsimmon_umd_minExports.whitespace, EXPRESSION.source, (_1, _2, source) => source),
	    whereClause: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/WHERE/i), parsimmon_umd_minExports.whitespace, EXPRESSION.field, (where, _, field) => {
	        return { type: "where", clause: field };
	    }).desc("WHERE <expression>"),
	    sortByClause: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/SORT/i), parsimmon_umd_minExports.whitespace, q.sortField.sepBy1(parsimmon_umd_minExports.string(",").trim(parsimmon_umd_minExports.optWhitespace)), (sort, _1, fields) => {
	        return { type: "sort", fields };
	    }).desc("SORT field [ASC/DESC]"),
	    limitClause: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/LIMIT/i), parsimmon_umd_minExports.whitespace, EXPRESSION.field, (limit, _1, field) => {
	        return { type: "limit", amount: field };
	    }).desc("LIMIT <value>"),
	    flattenClause: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/FLATTEN/i).skip(parsimmon_umd_minExports.whitespace), q.namedField, (_, field) => {
	        return { type: "flatten", field };
	    }).desc("FLATTEN <value> [AS <name>]"),
	    groupByClause: q => parsimmon_umd_minExports.seqMap(parsimmon_umd_minExports.regexp(/GROUP BY/i).skip(parsimmon_umd_minExports.whitespace), q.namedField, (_, field) => {
	        return { type: "group", field };
	    }).desc("GROUP BY <value> [AS <name>]"),
	    // Full query parsing.
	    clause: q => parsimmon_umd_minExports.alt(q.fromClause, q.whereClause, q.sortByClause, q.limitClause, q.groupByClause, q.flattenClause),
	    query: q => parsimmon_umd_minExports.seqMap(q.headerClause.trim(optionalWhitespaceOrComment), q.fromClause.trim(optionalWhitespaceOrComment).atMost(1), q.clause.trim(optionalWhitespaceOrComment).many(), (header, from, clauses) => {
	        return {
	            header,
	            source: from.length == 0 ? Sources.folder("") : from[0],
	            operations: clauses,
	            settings: DEFAULT_QUERY_SETTINGS,
	        };
	    }),
	});
	/**
	 * A parser for optional whitespace or comments. This is used to exclude whitespace and comments from other parsers.
	 */
	const optionalWhitespaceOrComment = parsimmon_umd_minExports.alt(parsimmon_umd_minExports.whitespace, QUERY_LANGUAGE.comment)
	    .many() // Use many() since there may be zero whitespaces or comments.
	    // Transform the many to a single result.
	    .map(arr => arr.join(""));

	// Useful utilities for directly using dataview parsers.
	// Utility functions.
	/**
	 * Get the current Dataview API from the app if provided; if not, it is inferred from the global API object installed
	 * on the window.
	 */
	const getAPI = (app) => {
	    if (app)
	        return app.plugins.plugins.dataview?.api;
	    else
	        return window.DataviewAPI;
	};
	/** Determine if Dataview is enabled in the given application. */
	const isPluginEnabled = (app) => app.plugins.enabledPlugins.has("dataview");

	lib.DATE_SHORTHANDS = DATE_SHORTHANDS;
	lib.DURATION_TYPES = DURATION_TYPES;
	lib.EXPRESSION = EXPRESSION;
	lib.KEYWORDS = KEYWORDS;
	lib.QUERY_LANGUAGE = QUERY_LANGUAGE;
	lib.getAPI = getAPI;
	lib.isPluginEnabled = isPluginEnabled;
	lib.parseField = parseField;
	
	return lib;
}

var libExports = requireLib();

class SuggestionIndex {
    constructor(plugin) {
        this.suggestionsList = [];
        this.suggestionsRefs = new Map(); // maps file paths to included suggestions
        this.suggestionsRefCount = new Map(); // maps suggestions to number of files including them
        this.plugin = plugin;
    }
    buildNewIndex() {
        // console.log("Begin Rebuilding dataview suggestion index");
        // const startTime = performance.now();
        const dataviewApi = libExports.getAPI(this.plugin.app);
        const newSuggestions = [];
        const newSuggestionsRefs = new Map();
        const newSuggestionsRefCount = new Map();
        const files = this.plugin.app.vault.getFiles();
        for (const file of files) {
            if (!this.filterFile(file.path)) {
                continue;
            }
            const page = dataviewApi.page(file.path);
            if (page === undefined)
                continue; // not a markdown file
            const compositeValues = this.extractCompositeValuesFromPage(page);
            const pageRefs = [];
            for (let compositeValue of compositeValues) {
                if (newSuggestions.indexOf(compositeValue) === -1) {
                    // suggestion not seen on any page yet
                    pageRefs.push(compositeValue);
                    newSuggestionsRefCount.set(compositeValue, 1);
                    newSuggestions.push(compositeValue);
                }
                else if (pageRefs.indexOf(compositeValue) === -1) {
                    // suggestion not seen on this page, but on another
                    pageRefs.push(compositeValue);
                    newSuggestionsRefCount.set(compositeValue, newSuggestionsRefCount.get(compositeValue) - 1);
                }
            }
            newSuggestionsRefs.set(file.path, pageRefs);
        }
        // replace old index
        this.suggestionsList = newSuggestions;
        this.suggestionsRefCount = newSuggestionsRefCount;
        this.suggestionsRefs = newSuggestionsRefs;
        // const endTime = performance.now();
        // console.log(
        //     `Rebuilt dataview autocomplete index (${this.suggestionsList.length} elements, ${(endTime - startTime).toFixed(2)}ms)`,
        // );
    }
    updateIndex(type, file, oldPath) {
        // also triggers on create!
        if (type === "update") {
            if (!this.filterFile(file.path)) {
                return;
            }
            const page = libExports.getAPI(this.plugin.app).page(file.path);
            if (page === undefined)
                return; // not a markdown file
            const updateCompositeValues = this.extractCompositeValuesFromPage(page);
            const oldCompositeValues = this.suggestionsRefs.get(file.path) || [];
            // deleting value from index if update reduces refcount to 0
            for (const oldCompositeValue of oldCompositeValues) {
                if (updateCompositeValues.indexOf(oldCompositeValue) === -1) {
                    // delete value
                    this.suggestionsRefCount.set(oldCompositeValue, this.suggestionsRefCount.get(oldCompositeValue) - 1);
                    if (this.suggestionsRefCount.get(oldCompositeValue) === 0) {
                        this.suggestionsList.splice(this.suggestionsList.indexOf(oldCompositeValue), 1);
                    }
                }
            }
            // adding value to index if not present in index
            for (const newCompositeValue of updateCompositeValues) {
                if (!this.suggestionsRefCount.has(newCompositeValue) ||
                    this.suggestionsRefCount.get(newCompositeValue) === 0) {
                    // not seen in this or other files
                    this.suggestionsList.push(newCompositeValue);
                    this.suggestionsRefCount.set(newCompositeValue, 1);
                }
                else if (oldCompositeValues.indexOf(newCompositeValue) === -1) {
                    this.suggestionsRefCount.set(newCompositeValue, this.suggestionsRefCount.get(newCompositeValue) + 1);
                }
            }
            this.suggestionsRefs.set(file.path, updateCompositeValues);
        }
        else if (type === "rename") {
            if (this.filterFile(file.path) && this.filterFile(oldPath)) {
                // both not ignored -> move refs
                this.suggestionsRefs.set(file.path, this.suggestionsRefs.get(oldPath));
                this.suggestionsRefs.delete(oldPath);
            }
            else if (this.filterFile(file.path)) {
                // old path ignored, new path not ignored -> upsert
                this.updateIndex("update", file, undefined);
            }
            else if (this.filterFile(oldPath)) {
                // old path not ignored, new path ignored -> delete
                for (const value of this.suggestionsRefs.get(oldPath)) {
                    this.suggestionsRefCount.set(value, this.suggestionsRefCount.get(value) - 1);
                    if (this.suggestionsRefCount.get(value) === 0) {
                        this.suggestionsList.splice(this.suggestionsList.indexOf(value), 1);
                    }
                }
                this.suggestionsRefs.delete(oldPath);
            }
        }
        else if (type === "delete") {
            // iterate suggestion refs in deleted file and decrement their ref count
            // if the ref count reaches 0, remove the suggestion from the list
            for (const value of this.suggestionsRefs.get(file.path)) {
                this.suggestionsRefCount.set(value, this.suggestionsRefCount.get(value) - 1);
                if (this.suggestionsRefCount.get(value) === 0) {
                    this.suggestionsList.splice(this.suggestionsList.indexOf(value), 1);
                }
            }
            this.suggestionsRefs.delete(file.path);
        }
        else {
            console.debug("Unknown update type:", type, file, oldPath);
        }
    }
    extractCompositeValuesFromPage(page) {
        const fields = Object.keys(page)
            .filter((k) => k !== "file")
            .map((k) => [k, page[k]]);
        const compositeValues = [];
        for (let [key, val] of fields) {
            // fields can be a single value or a dict, so we need to handle both
            let arrayVal;
            if (!Array.isArray(val)) {
                arrayVal = [val];
            }
            else {
                arrayVal = val;
            }
            // Add composite value "key:: value" to suggestions list
            for (const value of arrayVal) {
                if (value === null || value === undefined)
                    continue; // skip empty fields
                let compositeValue = this.formatCompositeValue(key, value);
                compositeValues.push(compositeValue);
                let prefixValue = key + ":: ";
                if (compositeValues.indexOf(prefixValue) < 0) {
                    compositeValues.push(prefixValue);
                }
                if (!this.filterCompositeValue(compositeValue)) {
                    continue;
                }
            }
        }
        return compositeValues;
    }
    /**
     * Filters out composite values from suggestions that match any of the ignored fields.
     * @returns true if the value should be shown in suggestions, false otherwise
     */
    filterCompositeValue(compositeValue) {
        for (const filterPattern of this.plugin.settings.ignoredFields) {
            const regex = new RegExp(`^(${filterPattern})::.*`);
            if (regex.test(compositeValue)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Converts a Dataview value to a string
     * returns the composite value in format "key:: value"
     */
    formatCompositeValue(key, value) {
        const dataviewAPI = libExports.getAPI(this.plugin.app);
        let stringValue;
        // If the value is a string, number or boolean, we can simply convert it to a string
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            stringValue = value.toString();
        }
        else if (dataviewAPI.value.typeOf(value) === "link" && value.type === "file") {
            // parse wiki-style links
            if (value.display !== undefined) {
                stringValue = `[[${value.path.split("/").pop().replace(".md", "")}|${value.display}]]`;
            }
            else {
                stringValue = `[[${value.path.split("/").pop().replace(".md", "")}]]`;
            }
        }
        else {
            stringValue = dataviewAPI.value.toString(value);
        }
        return `${key}:: ${stringValue}`;
    }
    filterFile(filepath) {
        for (const filterPattern of this.plugin.settings.ignoredFiles) {
            const regex = new RegExp(filterPattern);
            if (regex.test(filepath)) {
                return false;
            }
        }
        return true;
    }
}

class DataviewSuggester extends obsidian.EditorSuggest {
    constructor(plugin, maxSuggestions = 10, singleErrorMode = false, allowExtraChars = false) {
        super(plugin.app);
        this.initialized = false;
        this.plugin = plugin;
        this.maxSuggestions = maxSuggestions;
        this.searcher = new uFuzzy({
            intraMode: singleErrorMode ? 1 : 0,
            intraIns: allowExtraChars ? 1 : 0,
        });
        this.suggestionsIndex = new SuggestionIndex(plugin);
    }
    onTrigger(cursor, editor, file) {
        const line = editor.getLine(cursor.line);
        let trigger = getTriggerText(line, cursor.ch);
        if (trigger !== null) {
            return {
                query: trigger[0],
                start: { line: cursor.line, ch: trigger[1] },
                end: { line: cursor.line, ch: trigger[2] },
            };
        }
        return null;
    }
    getSuggestions(context) {
        const suggestionsList = this.suggestionsIndex.suggestionsList;
        const idxs = this.searcher.filter(suggestionsList, context.query);
        if (idxs != null && idxs.length > 0) {
            let info = this.searcher.info(idxs, suggestionsList, context.query);
            let order = this.searcher.sort(info, suggestionsList, context.query);
            // return top N suggestions with marks
            return order
                .slice(0, this.maxSuggestions)
                .map((idx) => [idx, suggestionsList[info.idx[idx]]])
                .map((suggestion) => uFuzzy.highlight(suggestion[1], info.ranges[suggestion[0]]));
        }
        return [];
    }
    /**
     * Renders a suggestion string to the HTML element using a markdown renderer
     * Uses the context to get the current editor and cursor position and
     * finds out if the suggestion should be rendered with or without the
     * field name.
     */
    renderMarkdownSuggestion(value, el) {
        // render markdown preview of inline dataview metadata field
        let suggestionText = this.context.editor.getLine(this.context.start.line).slice(this.context.start.ch - 1, this.context.start.ch);
        suggestionText += value.replace(/<mark>(.*?)<\/mark>/g, "$1");
        suggestionText += suggestionText.startsWith("(") ? ")" : "]";
        // Different rendering for prefix suggestions
        var markdownText;
        if (/.*\:: [\]\)]/.test(suggestionText)) {
            markdownText = obsidian.htmlToMarkdown("[" + suggestionText.slice(1, -1) + "*…*]");
        }
        else {
            markdownText = obsidian.htmlToMarkdown(suggestionText);
        }
        console.log(markdownText);
        obsidian.MarkdownRenderer.render(this.app, markdownText, el, this.context.file.path, this.app.workspace.getActiveViewOfType(obsidian.MarkdownView));
    }
    /**
     * Render the suggestion as markdown source code with highlights
     */
    renderSourceSuggestion(value, el) {
        // render source text with highlights
        // replaces <mark>...</mark> with <span>...</span>
        const parts = value.split(/(<mark>.*?<\/mark>)/g);
        parts.forEach((textPart) => {
            if (textPart.startsWith("<mark>") && textPart.endsWith("</mark>")) {
                const text = textPart.slice(6, -7); // Remove <mark> and </mark>
                el.createEl("span", { text, cls: "dataview-suggestion-highlight" });
            }
            else {
                el.appendText(textPart);
            }
        });
    }
    renderSuggestion(value, el) {
        const container = el.createDiv("dataview-suggestion-content");
        const titleDiv = container.createDiv("dataview-suggestion-title");
        const noteDiv = container.createDiv("dataview-suggestion-note");
        this.renderMarkdownSuggestion(value, titleDiv);
        this.renderSourceSuggestion(value, noteDiv);
    }
    selectSuggestion(value, evt) {
        // remove marks from selection
        value = value.replace(/<mark>(.*?)<\/mark>/g, "$1");
        const { editor, start, end } = this.context;
        editor.replaceRange(value, start, end);
        // move cursor to end of suggestion for finished suggestions
        // or to the end of the prefix
        var newCursorPos;
        if (value.endsWith(":: ")) {
            newCursorPos = {
                line: end.line,
                ch: start.ch + value.length,
            };
        }
        else {
            newCursorPos = {
                line: end.line,
                ch: start.ch + value.length + 1,
            };
        }
        editor.setCursor(newCursorPos);
    }
    onDataviewIndexReady() {
        this.suggestionsIndex.buildNewIndex();
        this.initialized = true;
    }
    // possible types: update, rename, delete. rename has oldPath
    onDataviewMetadataChange(type, file, oldPath) {
        if (!this.initialized) {
            // console.warn("Dataview Autocompletion index not ready yet. Skipping index update");
            return;
        }
        this.suggestionsIndex.updateIndex(type, file, oldPath);
    }
    /**
     * Trigger a full rebuild of the suggestion index
     */
    rebuildIndex() {
        this.suggestionsIndex.buildNewIndex();
    }
}

class SettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        const excludeDesc = document.createDocumentFragment();
        const link = document.createElement("a");
        link.href = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions";
        link.text = "Regex patterns";
        excludeDesc.append(link);
        excludeDesc.append(" to exclude field names from suggestions. One pattern per line.");
        new obsidian.Setting(containerEl)
            .setName("Exclude fields")
            .setDesc(excludeDesc)
            .addTextArea((textArea) => {
            textArea.inputEl.setAttribute("rows", "5");
            textArea
                .setPlaceholder("created.*\nmodified.*\ndate")
                .setValue(this.plugin.settings.ignoredFields.join("\n"))
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                this.plugin.settings.ignoredFields = value
                    .split("\n")
                    .map((val) => val.trim())
                    .filter((val) => val.length > 0);
                yield this.plugin.saveSettings();
                (_a = this.plugin.suggester) === null || _a === void 0 ? void 0 : _a.rebuildIndex();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Path pattern to exclude files or folders from suggestions. One pattern per line.")
            .addTextArea((textArea) => {
            textArea.inputEl.setAttribute("rows", "5");
            textArea
                .setPlaceholder("templates/")
                .setValue(this.plugin.settings.ignoredFiles.join("\n"))
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                this.plugin.settings.ignoredFiles = value
                    .split("\n")
                    .map((val) => val.trim())
                    .filter((val) => val.length > 0);
                yield this.plugin.saveSettings();
                (_a = this.plugin.suggester) === null || _a === void 0 ? void 0 : _a.rebuildIndex();
            }));
        });
    }
}

const DEFAULT_SETTINGS = {
    ignoredFields: ["created.*", "modified.*", "date"],
    ignoredFiles: ["templates/"],
};
class DataviewAutocompletePlugin extends obsidian.Plugin {
    onload() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.addSettingTab(new SettingsTab(this.app, this));
            this.suggester = new DataviewSuggester(this, 10, true, true);
            this.registerEditorSuggest(this.suggester);
            this.registerEvent(
            // @ts-ignore
            this.app.metadataCache.on("dataview:index-ready", () => {
                this.suggester.onDataviewIndexReady();
            }));
            this.registerEvent(this.app.metadataCache.on(
            // @ts-ignore
            "dataview:metadata-change", (type, file, oldPath) => {
                this.suggester.onDataviewMetadataChange(type, file, oldPath);
            }));
            if (libExports.isPluginEnabled(this.app) && ((_a = libExports.getAPI(this.app)) === null || _a === void 0 ? void 0 : _a.index.initialized)) {
                this.suggester.onDataviewIndexReady();
            }
        });
    }
    onunload() { }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = DataviewAutocompletePlugin;


/* nosourcemap */