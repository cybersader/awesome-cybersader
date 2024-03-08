# docs

`searchAndFlatten` is a JavaScript function that takes a JSON object and searches for specific keys within it. When a matching key is found, the function flattens the nested structure into a single-level object or an array of objects, depending on the given configuration.

## Parameters

The `searchAndFlatten` function has the following parameters:

1. `jsonObj`: The JSON object to search and flatten.
2. `rootKey`: The root key within the JSON object where the search should start.
3. `keysToSearch`: An array of keys to search for within the JSON object.
4. `similarityThreshold`: The minimum similarity value (0 to 1) required for a key to be considered a match. This value is calculated using the `stringSimilarity.compareTwoStrings` function.
5. `arrayHandling`: (Optional) Specifies how to handle arrays within the JSON object. Defaults to 'stringify'. Possible values are:
- 'stringify': Converts the array to a JSON string.
- 'horizontal': Flattens the array horizontally.
- 'explode': Explodes the array, creating multiple entries.
1. `objectHandling`: (Optional) Specifies how to handle nested objects within the JSON object. Defaults to 'stringify'. Possible values are:
- 'stringify': Converts the nested object to a JSON string.
- 'recurse': Recursively searches and flattens the nested object.
1. `allowDotNotation`: (Optional) A boolean value that specifies whether to use dot notation for matching keys. Defaults to 'false'.

## Usage

To use the `searchAndFlatten` function, you can call it like this:

```
const flattenedResult = searchAndFlatten(
  jsonObj,
  rootKey,
  keysToSearch,
  similarityThreshold,
  arrayHandling, // Optional
  objectHandling, // Optional
  allowDotNotation // Optional
);

```

## Caveats

- The `searchAndFlatten` function relies on the `stringSimilarity.compareTwoStrings` function to compare key similarity. Ensure that this function is available in your environment.
- The `similarityThreshold` should be a value between 0 and 1. Adjust it according to the desired level of similarity required for key matching.
- The `searchAndFlatten` function might not provide the expected results when dealing with JSON objects containing circular references or complex, deeply nested structures.
- The function may not handle large JSON objects efficiently, as it uses recursion to search and flatten the nested structures. For very large JSON objects, consider using an iterative approach or streaming-based solutions to improve performance.