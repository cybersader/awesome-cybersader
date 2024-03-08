# Development

```jsx
Can you create a new function that is similar to the below "flatten" function and call it "granular_flatten".  Instead of automatically applying its array and object handling parameters, I want it to also take in the granular "search_config" parameter, along with the second element of the tuple returned by find_keys with has the "search_key:match" pairs in them.  I want it to apply flatten as usual, but as it comes across keys
```

```jsx
Okay we need to refactor the array and granular case, and we also need to more importantly change the find_keys function. Here's how I want the process to work.

Still have the "if isinstance(search_config, dict):" and "elif isinstance(search_config, list):", but now I want them handled differently and "find_keys" changed.

If the search config is a list, then I want the program to use find_keys for each key in that array (use the direct path if allow_dot_notation is
true and have a case to default back to jaccard if that doesn't work).  Also, if the inputted object to "search_and_flatten" is rather an
array of objects, then loop through each object in that array and loop through each key - running find key for every key over every object.
- For each object, find keys should be used and take into account granular (dict for search config) vs array (list for search config). 
	- If it is granulalr, then find keys should use the granular options for that specific key (if some are missing than use the "upper level" ones or the main parameters for "search_and_flatten".
	- If it is array, then use find keys for each key with the main parameters for "search_and_flatten"

Just to reiterate, this all means that "search_and_flatten" can take in either a singular object or an array of objects. For each object, it should go through the granular or list keys in "search_config" and
create new objects based on found key value pairs which are also transformed by the array and object handling parameters.

Change the list case, granular (dict) case, and the find keys function to do this
```

```jsx
I need an overhaul of the current "search_and_flatten" function. I want the new search_and_flatten to be flexible.
Here's some of the requirements and/or caveats to address.

Handling the search config parameter:
- Wildcard ("*") - already handled well by feeding the input object directly into the "flatten"
function
- Arrays - this can be an array of key names or EXACT JSON paths to the keys in the object.
If allowDotNotation is allowed then, the function should check the key name in the array
for a direct match (especially if it is in dot notation.
- Granular (object/dictionary) - this is an object that can dynamically set (similarity threshold,
array_handling, object_handling, allow_dot_notation, and filter_empty_objects) for each key being searched for.
Each key in the dictionary is the name or dot notation /JSONPath being searched for. Here's where some of
the big problems show. For instance, the array handling can differ between various key names in the 
object/dict. 

Caveats/edge cases to address with granular search config):
- dot notation with jaccard inside key for granular search config: this means that name itself is in dot notation and it can be similar to a path to match.
Fuzzily matching JSON pathes should be addressed
- There may be two keys which are related (parent/child): In this case, do searches for both as you normally would. For instance, 
security is a parent of provider. If the below object is given, then there would legitimately be two instances of "security.provider". In these cases, if they are exactly the same,
then deduplicate them, else add "_dup1" and "_dup2" to the end.
"security":{
	  "similarity_threshold": 0.8,
	  "array_handling": "explode",
	  "object_handling": "recurse",
	  "allow_dot_notation": false,
	  "filter_empty_objects": false
	},
	"provider":{
	  "similarity_threshold": 0.8,
	  "array_handling": "explode",
	  "object_handling": "stringify",
	  "allow_dot_notation": false,
	  "filter_empty_objects": false
	},
- One last caveat, I want jaccard similarity to be used completely for search when "allow_dot_notation" is false. If it is true, then first try the exact JSON path to the key.
If this doesn't work, then try fuzzy matching to the path.

The general approach:
- Take the keys from search config (no keys for the wildcard case)
- Look for keys (fuzzily using jaccard, and exactly when allow_dot_notation is True, but defaulting back to jaccard when that doesn't work)
- When keys are found, use the flatten function with the granular options (if given for that key), else use the 1st level parameters given in the options object.
```

```jsx
As you can see in the search_keys function (inside the search_and_flatten function), the wildcard is handled completely different from the granular or array options for "search_config".  It seems with the below parameters, that I get empty objects.  Can you find the problem?  Do you need more code from me to figure it out?

input_json = "dummy.json"
root_key = "assets"

array_search_config = {
        "input_json": "dummy.json",
        "root_key": "assets",
        "search_config": ["name", "security", "public_ips"],
        "similarity_threshold": 1.0,
        "array_handling": "stringify",
        "object_handling": "stringify",
        "allow_dot_notation": False,
        "filter_empty_objects": False,
    }

# additional options and everything inside an object
    options = {
        "input_json": input_json,
        "root_key": root_key,
        "similarity_threshold": 0.9,
        "search_config": array_search_config,
        "array_handling": "explode",
        "object_handling": "stringify",
        "allow_dot_notation": False,
        "filter_empty_objects": False,
        "delimiter": ",",
        "search_name": "test_search",
        "verbose": True,
        "separator": ".",
    }

# run the test
csv_filename = search_and_flatten_to_csv(**options)
```

```jsx
Make a simple, recursive, and optimized Python function that can take an input JSON object / Python dictionary and completely flatten it.  This function also handles arrays with an arrayHandling parameter.  

The function call should look like this with params "def flatten(data, arrayHandling='explode', separator='.'):"

It should take the below input object:
data = {
    "name": "object1",
    "public_ips": ["example1", "example2"],
    "security": {
        "score": "good",
        "provider": "sec"
    }
}

AND turn it into the resulting object (below) when given the explode param.
[
    {
        "name": "object1",
        "public_ips": "example1",
        "security.score": "good",
        "security.provider": "sec"
    },
    {
        "name": "object1",
        "public_ips": "example2",
        "security.score": "good",
        "security.provider": "sec"
    }
]

Horizontal should give:

{'name': 'object1', 'public_ips[0]': 'example2', 'public_ips[1]': 'example2', 'security.score': 'good', 'security.provider': 'sec'}

Stringify should give:
{
    "name": "object1",
    "public_ips": "[\"example1\", \"example2\"]",
    "security.score": "good",
    "security.provider": "sec"
  }

Just to reiterate AGAIN...this is important.

Below are the expectations for the different array handling options:

Stringify:
{
  "name": "object1",
  "public_ips": "[\"example1\", \"example2\"]",
  "security.score": "good",
  "security.provider": "sec"
}

Explode:
{
  "name": "object1",
  "public_ips":"example1",
  "security.score": "good",
  "security.provider": "sec"
},
{
  "name": "object1",
  "public_ips":"example2",
  "security.score": "good",
  "security.provider": "sec"
}

Horizontal:
{
    "name": "object1",
    "public_ips[0]": "example1",
    "public_ips[1]": "example2",
    "security.score": "good",
    "security.provider": "sec",
  },
```

```jsx
In the config.json object, I would also like to be able to set "job" variables for search jobs that are used on items that are not granular.  This is akin to the Javascript function below as it takes in parameters which are applied to all chosen keys that don't have granular search parameters set via the search configs.  

const searchAndFlatten = (
    jsonObj,
    rootKey,
    searchConfig = '*',
    similarityThreshold = 1.0,
    arrayHandling = 'stringify',
    objectHandling = 'stringify',
    allowDotNotation = false,
    filterEmptyObjects = false
) => {
    const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
        const result = {};

        const processMatch = (key, newPath, arrayHandling, objectHandling) => {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                if (objectHandling === 'recurse') {
                    const nestedResult = searchKeys(obj[key], newPath);

                    for (const nestedKey in nestedResult) {
                        result[`${newPath}.${nestedKey}`] = nestedResult[nestedKey];
                    }
                } else if (objectHandling === 'stringify') {
                    result[newPath] = JSON.stringify(obj[key]);
                }
            } else {
                if (arrayHandling === 'horizontal' && Array.isArray(obj[key])) {
                    obj[key].forEach((value, index) => {
                        result[`${newPath}[${index}]`] = value;
                    });
                } else if (arrayHandling === 'explode' && Array.isArray(obj[key])) {
                    explodedArrays.push({
                        key: newPath,
                        values: obj[key]
                    });
                } else {
                    result[newPath] = Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : obj[key];
                }
            }
        };

        for (const key in obj) {
            const newPath = currentPath ? `${currentPath}.${key}` : key;
            let compareKey = allowDotNotation ? newPath : key;

            const applySearchKey = (searchKey, arrayHandling, objectHandling, similarityThreshold) => {
                const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                if (similarity >= similarityThreshold) {
                    processMatch(key, newPath, arrayHandling, objectHandling);
                }
            };

            if (searchConfig === '*') {
                applySearchKey(compareKey, arrayHandling, objectHandling, similarityThreshold);
            } else if (Array.isArray(searchConfig)) {
                searchConfig.forEach((searchKey) => {
                    applySearchKey(searchKey, arrayHandling, objectHandling, similarityThreshold);
                });
            } else if (typeof searchConfig === 'object') {
                const config = searchConfig[compareKey] || {};
                if (config) {
                    const granularArrayHandling = config.arrayHandling || arrayHandling;
                    const granularObjectHandling = config.objectHandling || objectHandling;
                    const granularSimilarityThreshold = config.similarityThreshold || similarityThreshold;

                    applySearchKey(compareKey, granularArrayHandling, granularObjectHandling, granularSimilarityThreshold);
                }
            }

            if (typeof obj[key] === 'object' && !allowDotNotation) {
                const nestedResults = searchKeys(obj[key], newPath, explodedArrays);
                for (const nestedKey in nestedResults.result) {
                    result[nestedKey] = nestedResults.result[nestedKey];
                }

                explodedArrays = nestedResults.explodedArrays;
            }
        }

        return {
            result,
            explodedArrays
        };
    };

    const explode = (baseObj, explodedArrays) => {
        if (explodedArrays.length === 0) {
            return [baseObj];
        }

        const {
            key,
            values
        } = explodedArrays[0];
        const remainingExplodedArrays = explodedArrays.slice(1);

        const explodedResults = [];

        values.forEach((value) => {
            const newBaseObj = {
                ...baseObj,
                [key]: value
            };
            const explodedChildren = explode(newBaseObj, remainingExplodedArrays);
            explodedResults.push(...explodedChildren);
        });

        return explodedResults;
    };

    const root = rootKey ? jsonObj[rootKey] : jsonObj;
    if (Array.isArray(root)) {
        let results = [];

        root.forEach((item) => {
            const {
                result,
                explodedArrays
            } = searchKeys(item);
            const explodedResults = explode(result, explodedArrays);
            results.push(...explodedResults);
        });

        // Filter out empty objects if filterEmptyObjects is true
        return filterEmptyObjects ?
            results.filter((obj) => Object.keys(obj).length > 0) :
            results;
    } else {
        const {
            result,
            explodedArrays
        } = searchKeys(root);
        const explodedResults = explode(result, explodedArrays);
        // Filter out empty objects if filterEmptyObjects is true
        return filterEmptyObjects ?
            explodedResults.filter((obj) => Object.keys(obj).length > 0) :
            explodedResults;
    }
};

I also want to change config.json to instead only have name, type, and then stuff for the type of job.  For search, here's an example config:

{
	"jobs":[
		{
			"name":"search",
			"type":"searchandflatten",
			"search_config_path":"searches.json",
			"searches": ["default", "explode_dot_notation_search"]
		}
	]
}

The searches.json will then look something like this which emulates the javascript implementation:

{
	"all_keys":{
		"inputJson":"dummy.json",
		"rootKey":"assets",
		"searchConfig":"*",
		"similarityThreshold":1.0,
		"arrayHandling":"stringify",
		"allowDotNotation":false,
		"filterEmptyObjects":false
  },
	"default":{
		"inputJson":"dummy.json",
		"rootKey":"assets",
		"searchConfig":["name","security","public_ips"],
		"similarityThreshold":1.0,
		"arrayHandling":"stringify",
		"allowDotNotation":false,
		"filterEmptyObjects":false
  },
	"granular_search":{
		"inputJson":"dummy.json",
		"rootKey":"assets",
		"searchConfig":
		{
			"name":{
			  "similarityThreshold": 1.0,
			  "arrayHandling": "explode",
			  "objectHandling": "stringify",
			  "allowDotNotation": true,
			  "filterEmptyObjects": true
			},
			"security.provider":{
			  "similarityThreshold": 0.8,
			  "arrayHandling": "explode",
			  "objectHandling": "stringify",
			  "allowDotNotation": true,
			  "filterEmptyObjects": true
			},
			"public_ips":{
			  "similarityThreshold": 0.7,
			  "arrayHandling": "explode",
			  "objectHandling": "recurse",
			  "allowDotNotation": true,
			  "filterEmptyObjects": true
			}
		},
		"similarityThreshold":1.0,
		"arrayHandling":"stringify",
		"allowDotNotation":false,
		"filterEmptyObjects":false
	}
}
```

```jsx
The following options and configuration are not working. Although the searchConfig variable supposedly allows for granular options with each key, I want to make sure that I can give these granular options and to also make sure that they still work with fuzzily matched keys in the process.

Right now, the below configuration is giving me empty results.

//Example of searchConfig being given an object for granular objects
{
  name:{
    similarityThreshold: 1.0,
    arrayHandling: 'stringify',
    objectHandling: 'stringify',
    allowDotNotation: false,
    filterEmptyObjects: true
  },
  security:{
    similarityThreshold: 0.8,
    arrayHandling: 'explode',
    objectHandling: 'stringify',
    allowDotNotation: false,
    filterEmptyObjects: true
  },
  public_ips:{
    similarityThreshold: 0.7,
    arrayHandling: 'explode',
    objectHandling: 'recurse',
    allowDotNotation: false,
    filterEmptyObjects: true
  }
};

const dummykeysToSearch = ['name','security','public_ips'];

const dummyoptions = {
    rootKey: 'assets',
    searchConfig: dummykeysToSearch,
    similarityThreshold: 1.0,
    arrayHandling: 'explode',
    objectHandling: 'stringify',
    allowDotNotation: false,
    filterEmptyObjects: true
};

const dummyJson = {
  "assets": [{
      "name": "object1",
      "public_ips": ["example1", "example2"],
      "security": {
          "score": "good",
          "provider": "sec"
      }
  }, {
      "name": "object2",
      "public_ips": ["example1", "example2"],
      "security": {
          "score": "good",
          "provider": "sec"
      }
  }, {
      "name": "object3",
      "public_ips": ["example1", "example2"],
      "security": {
          "score": "good",
          "provider": "sec"
      }
  }, {
      "name": "object4",
      "public_ips": ["example1", "example2"]
  }, {
      "name": "object5",
      "public_ips": ["example1", "example2"],
      "security": {
          "score": "good",
          "provider": "sec"
      }
  }]
}

// Search and flatten using custom function
const flattenedObject = searchAndFlatten(dummyJson, dummyoptions);
```