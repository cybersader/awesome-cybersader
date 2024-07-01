# Useful Tools
- https://codebeautify.org/html-to-markdown

# Useful Regex

```regex
([\s]*)\n\n
```

- Find
```regex
#\s.*\n*(\\\|(.|\s)*?\n)\n
```

## Regex that can find SPL queries and put them in code blocks
```
^(?<first_line>(?:(?:\\\|\s?)?(?:from|index).*?)\n)(?<subsequent_lines>^(?:(?!(?:(((?:\\\|\s?)?(?:from|index)|(\#))).+?)\n)(?:(?:\\\|\s?)?.+\n))+)?

^((?:(?:\\\|\s?)?(?:from|index).*?)\n)(^(?:(?!(?:(?:(?:(?:\\\|\s?)?(?:from|index)|(\#))).+?)\n)(?:(?:\\\|\s?)?.+\n))+)?

^[ ]{0,3}((?:(?:\\\|\s?)?(?:from|index|makeresults).*?)\n)(^(?:(?!(?:(?:(?:(?:\\\|\s?)?(?:from|index)|(\#))).+?)\n)(?:(?:\\\|\s?)?.+\n))+)?
```

- Replace
```
```\n$1$2```\n\n
```

```
(\\||\\'|\\$|\\*|\\"|\\.|\\[|\\])
```

## Get rid of spaces for all SPL queries
- Find spaces - group 2
```
^\s?((?:\\\|\s?).+\n)(?:(\n)(?!(?:(?:\\\|\s?)?(?:from|index)|(\#)).+?\n?))
```

- Replace $2 (group 2) with empty
```
S1
```
## Get rid of tons of spaces in bullet points
- Find spaces between bullets
```
(?:\-([^\S\n]{1,10})((?:[\S]+[^\S\n]?)+\n)(\n)?)
```
- Replace
```
-$1$2
```

## Get rid of empty headings
- find empty headings
```
#(?!\s[\d\w]+).+?\n(\n)
```

- replace
```
$1
```