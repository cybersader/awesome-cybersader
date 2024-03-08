# Search and Explode JSON

# Similar Apps

- [https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)
- 

# Turn this into a business

- Free and open source
    - Free
        - Use right in the web client
        - Save stuff to JSON files to load in for later use
        - Uses my serverless functions / CORS header proxy
    - Open source
        - all the features, but you host it yourself
- Paid
    - Features:
        - Logs
        - Authentication / SSO
        - Saving of REST endpoint and schemes and data

# Features to Develop

- Take in example JSON objects or make requests and get responses to select keys from
    - Search bar fuzzily search for keys and add them to the export
- Algorithm that guesses where the root node is to turn everything into an array of objects
- Backwards of the main algorithm to transform csv into arrays of objects
    - turn dot notation from csv names into objects
    - create object using combination of fuzzy column name matching and example schema
- Can redirect API calls in any format using serverless functions and a builtin cors header proxy
- Deploy modifed REST APIs by manipulating response objects and transforming them
- automatically spin up csv pages w8th the csv data
- ability to save everything to a file including keys used to search, collections, variables.  Have all of the functionality that postman has.
- Show errors as an additional column as console.log
- Recursive API calls
    - Ability to make recursive API calls that turn a value from an obtained key value in the response object, and use it as a param for a subsequent API call
    - Add logic to allow for JOINs to make extra columns per entity/row
- Make a GUI that can load huge JSON objects like the tree option in JSON editor online
- Filter parameter - can take booleans based on the value of keys and only return rows that are true for those conditions
- Export destination options
- Small program to aggregate an example JSON object by adding in all of the potential keys—creates example schema to explore
- Granular option to only match to keys that are down to a certain depth
- Simplify application to instead transform the JSON into a cleaned version with the right keys, then flatten it. This would simplify the process.
- Preprocess the input json to find all of the present headers to optimize writing to a csv
- job var keys
- use a prepend key for all functions with filename outputs
- Make my own query language to do transformations and such
- Make the count items function have a test mode and num test rows limit too

# searchAndFlatten Function Documentation

[docs](Search%20and%20Explode%20JSON/docs.md)

# GPT4 convo

[Convo](Search%20and%20Explode%20JSON/Convo.md)

[Development](Search%20and%20Explode%20JSON/Development.md)

# Search and Flatten JSON v5

```jsx
I want you to change the below function.  First, add a percent_unique and percent_nonull for col_stats.  Next, I want there to be 5 new parameters: "max_value_length", "long_value_handling",  "show_unique_values", "show_unique_counts", and "uniq_value_mode".

Here's how the parameters will work:
All of these new parameters are designed to make it so that the new csv with analytics can also show values or unique values along with the ability to show their counts, handle situations of lots of unique values or extremely long values.
1) max_value_length - this will emulate the "max_string_length" param from the flatten function in that it will be used with handling long values. When a csv has a column and row (value) that is longer than this, then it will use "long_value_handling" to decide what to do with it.
2) long_value_handling - this will emulate the "long_string_handling" param from the flatten function. If truncate is given, then it will trim the value to be less than the max_value_length like what is done in the below flatten function. If explode is given, then it will create multiple new rows to make up for the excess parts of value (like what is done in the flatten function)
3) "show_unique_values" - a boolean param that will decide if to include the unique values (as is applicable to these 5 new params. If true, then a unique values column will be created for each one of the columns being analyzed. 
4) show_unique_counts - these 5 new params are designed to show all of the unique values that appear with a column. If this is true, then instead of showing a list of the unique values for that column name, then a count and a percentage is included with the unique_value. This is done by turning the unique_values column values (instances or row values) into objects/dicts with the unique value as the key and then children keys of count and percent.
5) uniq_value_mode - this is essential. This will have two options: "all_values" and "efficient".  If "all_values" is given, then every column that is being analyzed will have data processed into its "unique_values" column. If "efficient" is given, then the csv analytics function will only process a "unique_values" column for instances where the percent_non_null is above an internal threshold (maybe 96%) and the percent unique times (*) the total number of values in the original times (*) 5 (for instance) is below the "max_value_length".  This keeps the function from processing columns where there will be tons of unique values like with an ID column, and it also keeps it from processing values for columns which don't usually have values (96% of the time).

# flatten function as example
# used to flatten objects using the array and object handling parameters, along with a separator for nested stuff
def flatten(data, array_handling='stringify', object_handling='recurse', separator='.', line_break_handling='escape',
            quote_handling='double', max_string_length=32759, long_string_handling='truncate'):
    def _flatten_helper(sub_data, prefix='', explode_buffer=None):
        if explode_buffer is None:
            explode_buffer = [{}]

        if isinstance(sub_data, dict):
            if object_handling == 'stringify' and prefix:
                for item in explode_buffer:
                    item[prefix] = escape_csv_string(json.dumps(sub_data), line_break_handling)
            else:  # object_handling == 'recurse'
                for key, value in sub_data.items():
                    new_key = sanitize_key_name(f"{prefix}{separator}{key}", line_break_handling, quote_handling) \
                        if prefix else sanitize_key_name(key, line_break_handling, quote_handling)
                    explode_buffer = _flatten_helper(value, new_key, explode_buffer)
        # object handling == 'explode'
        elif isinstance(sub_data, list) and array_handling == 'explode':
            if not sub_data:  # Check if the array is empty
                for item in explode_buffer:
                    break  # ignore empty arrays
            else:
                new_buffer = []
                for value in sub_data:
                    new_explode_buffer = [item.copy() for item in explode_buffer]
                    new_explode_buffer = _flatten_helper(value, prefix, new_explode_buffer)
                    new_buffer.extend(new_explode_buffer)
                explode_buffer = new_buffer
        # object handling == 'horizontal'
        elif isinstance(sub_data, list) and array_handling == 'horizontal':
            for idx, value in enumerate(sub_data):
                new_key = f"{prefix}[{idx}]"
                explode_buffer = _flatten_helper(value, new_key, explode_buffer)
        else:  # object handling == 'stringify'
            if array_handling == 'stringify' and isinstance(sub_data, list):
                sub_data = escape_csv_string(json.dumps(sub_data), line_break_handling)
                if len(sub_data) > max_string_length and long_string_handling == 'truncate':
                    sub_data = sub_data[:max_string_length]

            if max_string_length is not None and len(str(sub_data)) > max_string_length:
                if long_string_handling == 'truncate':
                    sub_data = str(sub_data)[:max_string_length]
                elif long_string_handling == 'horizontal':
                    sub_data = str(sub_data)
                    sub_data_parts = [sub_data[i:i + max_string_length] for i in
                                      range(0, len(sub_data), max_string_length)]
                    for idx, value in enumerate(sub_data_parts):
                        new_key = f"{prefix}[{idx}]"
                        explode_buffer = _flatten_helper(value, new_key, explode_buffer)
                elif long_string_handling == 'explode':
                    sub_data = str(sub_data)
                    sub_data_parts = [sub_data[i:i + max_string_length] for i in
                                      range(0, len(sub_data), max_string_length)]
                    new_buffer = []
                    for value in sub_data_parts:
                        new_explode_buffer = [item.copy() for item in explode_buffer]
                        new_explode_buffer = _flatten_helper(value, prefix, new_explode_buffer)
                        new_buffer.extend(new_explode_buffer)
                    explode_buffer = new_buffer

            for item in explode_buffer:
                item[prefix] = sub_data

        return explode_buffer

    data = sanitize_top_level_keys(data, line_break_handling, quote_handling)

    if isinstance(data, list):  # input is a list of objects
        result = []
        for item in data:
            flattened_item = _flatten_helper(item)
            if flattened_item:
                result.extend(flattened_item)
    else:  # input is a single object
        result = _flatten_helper(data)

    return result

# csv analytics function TO BE CHANGED

def generate_column_analytics(input_csv, output_csv=None, chunksize=5000):
    total_rows = count_rows(input_csv)

    result = pd.DataFrame()

    with tqdm(total=total_rows, desc='Processing chunks', unit=' rows', ncols=100) as pbar:
        for chunk in pd.read_csv(input_csv, chunksize=chunksize, low_memory=False):
            chunk_stats = []

            for column_name in chunk.columns:
                col_data = chunk[column_name]

                if pd.api.types.is_numeric_dtype(col_data):
                    col_stats = {
                        'column_name': column_name,
                        'mean': col_data.mean(),
                        'median': col_data.median(),
                        'std': col_data.std(),
                        'min': col_data.min(),
                        'max': col_data.max(),
                        '25_percentile': col_data.quantile(0.25),
                        '75_percentile': col_data.quantile(0.75),
                        'non_null': col_data.count(),
                        'null': col_data.isnull().sum()
                    }
                else:
                    col_stats = {
                        'column_name': column_name,
                        'unique': col_data.nunique(),
                        'non_null': col_data.count(),
                        'null': col_data.isnull().sum(),
                        'mode': col_data.mode().iloc[0] if not col_data.mode().empty else None,
                        'value_counts': col_data.value_counts().to_dict()
                    }

                chunk_stats.append(col_stats)

            result = result.append(chunk_stats, ignore_index=True)
            pbar.update(chunk.shape[0])

    if output_csv is None:
        input_csv_basename = os.path.basename(input_csv)
        filename_without_ext = os.path.splitext(input_csv_basename)[0]
        output_csv = f'col_analysis__{filename_without_ext}.csv'

    result.to_csv(output_csv, index=False)
```

```jsx
const searchAndFlatten = (
    jsonObj,
    rootKey,
    keysToSearch = '*',
    similarityThreshold = 1.0,
    arrayHandling = 'stringify',
    objectHandling = 'stringify',
    allowDotNotation = false,
    filterEmptyObjects = false,
    granularSearchConfig = {}
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
                } else
                if (arrayHandling === 'explode' && Array.isArray(obj[key])) {
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

            const applySearchKey = (searchKey, arrayHandling, objectHandling) => {
                const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                if (similarity >= similarityThreshold) {
                    processMatch(key, newPath, arrayHandling, objectHandling);
                }
            };

            if (keysToSearch === '*') {
                applySearchKey(compareKey, arrayHandling, objectHandling);
            } else {
                keysToSearch.forEach((searchKey) => {
                    const config = granularSearchConfig[searchKey] || {};
                    const granularArrayHandling = config.arrayHandling || arrayHandling;
                    const granularObjectHandling = config.objectHandling || objectHandling;
                    const granularSimilarityThreshold = config.similarityThreshold || similarityThreshold;

                    applySearchKey(searchKey, granularArrayHandling, granularObjectHandling, granularSimilarityThreshold);
                });
            }

            if (typeof obj[key] === 'object' && !
                allowDotNotation) {
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
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['asset_name', 'public_ips', 'distribution_name', 'is_public', 'ingress_ports', 'public_dnss', 'PublicDnsName', 'asset_category', 'organization_name', 'cloud_provider', 'asset_subcategory', 'asset_labels', 'severity', 'orca_score', 'score', 'status', 'IsInternetFacing', 'DistroCategory', 'Applications', 'tags_list'];
const options = {
    rootKey:'data', 
    keysToSearch: keysToSearch, 
    similarityThreshold: 1.0, 
    arrayHandling: 'explode', 
    objectHandling: 'stringify', 
    allowDotNotation: false, 
    filterEmptyObjects: true
    };

//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch = '*',
            similarityThreshold = 1.0,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false,
            filterEmptyObjects = false,
            granularSearchConfig = {}
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
                        } else
                        if (arrayHandling === 'explode' && Array.isArray(obj[key])) {
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

                    const applySearchKey = (searchKey, arrayHandling, objectHandling) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
                            processMatch(key, newPath, arrayHandling, objectHandling);
                        }
                    };

                    if (keysToSearch === '*') {
                        applySearchKey(compareKey, arrayHandling, objectHandling);
                    } else {
                        keysToSearch.forEach((searchKey) => {
                            const config = granularSearchConfig[searchKey] || {};
                            const granularArrayHandling = config.arrayHandling || arrayHandling;
                            const granularObjectHandling = config.objectHandling || objectHandling;
                            const granularSimilarityThreshold = config.similarityThreshold || similarityThreshold;

                            applySearchKey(searchKey, granularArrayHandling, granularObjectHandling, granularSimilarityThreshold);
                        });
                    }

                    if (typeof obj[key] === 'object' && !
                        allowDotNotation) {
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

        function arrayOfObjectsToCsv(data) {
            if (!Array.isArray(data) || data.length === 0) return '';

            // Get the CSV headers
            const headers = Object.keys(data[0]);

            // Get the CSV rows
            const rows = data.map(obj => {
                return headers.map(header => {
                    const value = obj[header];
                    return typeof value === 'undefined' || value === null ? '' : `"${value.toString().replace(/"/g, '""')}"`;
                }).join(',');
            }).join('\n');

            // Combine headers and rows to create the final CSV string
            const csv = headers.join(',') + '\n' + rows;

            return csv;
        }

        // Parse the response body into a JavaScript object
        const responseBody = pm.response.text();
        const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(responseJson, options);

        // Convert the flattened object to CSV format (using Papa Parse)
        // const csv = Papa.unparse(flattenedObject);

        const csv = arrayOfObjectsToCsv(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        //pm.visualizer.set(JSON.stringify(flattenedObject));
        pm.visualizer.set(csv);
        pm.environment.set("csvData", csv);
        pm.collectionVariables.set("csvData", csv);
    });
});
```

# Search and Flatten JSON v1

```jsx
//Set keys to look for in the object and return
// const keysToSearch = ['asset_name','public_ips','distribution_name','is_public','ingress_ports','public_dnss','PublicDnsName','asset_category','organization_name','cloud_provider','asset_subcategory','asset_labels','severity','orca_score','score','status','IsInternetFacing','DistroCategory','Applications'];
// const options = ['data', keysToSearch, 1.0, 'explode', 'stringify', false, true];

const options = {
    similarityThreshold: 1.0,
    arrayHandling: 'explode',
    objectHandling: 'stringify',
    allowDotNotation: false,
    filterEmptyObjects: true
};

//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey = '',
            keysToSearch = ['*'],
            similarityThreshold = 1.0,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false,
            filterEmptyObjects = false
        ) => {

            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                const processMatch = (key, newPath) => {
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

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
                            processMatch(key, newPath);
                        }
                    });

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

            const root = rootKey === '' ? jsonObj : jsonObj[rootKey];

            if (Array.isArray(root)) {
                let results = [];

                root.forEach((item) => {
                const { result, explodedArrays } = searchKeys(item);
                const explodedResults = explode(result, explodedArrays);
                results.push(...explodedResults);
                });

                // Filter out empty objects if filterEmptyObjects is true
                return filterEmptyObjects
                ? results.filter((obj) => Object.keys(obj).length > 0)
                : results;
            } else {
                const { result, explodedArrays } = searchKeys(root);
                const explodedResults = explode(result, explodedArrays);

                // Filter out empty objects if filterEmptyObjects is true
                return filterEmptyObjects
                ? explodedResults.filter((obj) => Object.keys(obj).length > 0)
                : explodedResults;
            }
        };

        function aerrayOfObjectsToCsv(arr) {
            const array = [Object.keys(arr[0])].concat(arr.map(o => Object.values(o)));

            // Check if the input is an array with a single key
            if (array[0].length === 1) {
                return array.map(row => row.join('')).join('\n');
            }

            return array.map(row => row.join(',')).join('\n');
        }

        function aarrayOfObjectsToCsv(arr) {
            const array = [Object.keys(arr[0])].concat(arr.map(o => Object.values(o)));

            // Check if the input is an array with a single key
            if (array[0].length === 1) {
                return array.map(row => row.join(',')).join('\n');
            }

            return array.map(row => row.join(',')).join('\n');
        }

        function aaarrayOfObjectsToCsv(data) {
            if (!Array.isArray(data) || data.length === 0) return '';

            // Get the CSV headers
            const headers = Object.keys(data[0]).join(',');

            // Get the CSV rows
            const rows = data.map(obj => {
                return Object.values(obj).join(',');
            }).join('\n');

            // Combine headers and rows to create the final CSV string
            const csv = headers + '\n' + rows;

            return csv;
        }

        function arrayOfObjectsToCsv(data) {
            if (!Array.isArray(data) || data.length === 0) return '';

            // Get the CSV headers
            const headers = Object.keys(data[0]).join(',');

            // Get the CSV rows
            const rows = data.map(obj => {
                return Object.values(obj).map(value => {
                if (typeof value === 'string') {
                    return '"' + value.replace(/"/g, '""') + '"';
                } else {
                    return value;
                }
                }).join(',');
            }).join('\n');

            // Combine headers and rows to create the final CSV string
            const csv = headers + '\n' + rows;

            return csv;
        }

        // Parse the response body into a JavaScript object
        const responseBody = pm.response.text();
        const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(responseJson, ...options);

        // Convert the flattened object to CSV format (using Papa Parse)
        // const csv = Papa.unparse(flattenedObject);

        const csv = arrayOfObjectsToCsv(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        //pm.visualizer.set(JSON.stringify(flattenedObject));
        pm.visualizer.set(csv);
        pm.environment.set("csvData", csv);
        pm.collectionVariables.set("csvData", csv);
    });
});
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['asset_name','public_ips','distribution_name','is_public','ingress_ports','public_dnss','PublicDnsName','asset_category','organization_name','cloud_provider','asset_subcategory','asset_labels','severity','orca_score','score','status','IsInternetFacing','DistroCategory','Applications'];
const options = ['data', keysToSearch, 1.0, 'explode', 'stringify', false, true];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey = '',
            keysToSearch = ['*'],
            similarityThreshold = 1.0,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false,
            filterEmptyObjects = false
        ) => {

            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                const processMatch = (key, newPath) => {
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

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
                            processMatch(key, newPath);
                        }
                    });

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

            const root = rootKey === '' ? jsonObj : jsonObj[rootKey];

            if (Array.isArray(root)) {
                let results = [];

                root.forEach((item) => {
                const { result, explodedArrays } = searchKeys(item);
                const explodedResults = explode(result, explodedArrays);
                results.push(...explodedResults);
                });

                // Filter out empty objects if filterEmptyObjects is true
                return filterEmptyObjects
                ? results.filter((obj) => Object.keys(obj).length > 0)
                : results;
            } else {
                const { result, explodedArrays } = searchKeys(root);
                const explodedResults = explode(result, explodedArrays);

                // Filter out empty objects if filterEmptyObjects is true
                return filterEmptyObjects
                ? explodedResults.filter((obj) => Object.keys(obj).length > 0)
                : explodedResults;
            }
        };

        function aerrayOfObjectsToCsv(arr) {
            const array = [Object.keys(arr[0])].concat(arr.map(o => Object.values(o)));

            // Check if the input is an array with a single key
            if (array[0].length === 1) {
                return array.map(row => row.join('')).join('\n');
            }

            return array.map(row => row.join(',')).join('\n');
        }

        function aarrayOfObjectsToCsv(arr) {
            const array = [Object.keys(arr[0])].concat(arr.map(o => Object.values(o)));

            // Check if the input is an array with a single key
            if (array[0].length === 1) {
                return array.map(row => row.join(',')).join('\n');
            }

            return array.map(row => row.join(',')).join('\n');
        }

        function aaarrayOfObjectsToCsv(data) {
            if (!Array.isArray(data) || data.length === 0) return '';

            // Get the CSV headers
            const headers = Object.keys(data[0]).join(',');

            // Get the CSV rows
            const rows = data.map(obj => {
                return Object.values(obj).join(',');
            }).join('\n');

            // Combine headers and rows to create the final CSV string
            const csv = headers + '\n' + rows;

            return csv;
        }

        function arrayOfObjectsToCsv(data) {
            if (!Array.isArray(data) || data.length === 0) return '';

            // Get the CSV headers
            const headers = Object.keys(data[0]).join(',');

            // Get the CSV rows
            const rows = data.map(obj => {
                return Object.values(obj).map(value => {
                if (typeof value === 'string') {
                    return '"' + value.replace(/"/g, '""') + '"';
                } else {
                    return value;
                }
                }).join(',');
            }).join('\n');

            // Combine headers and rows to create the final CSV string
            const csv = headers + '\n' + rows;

            return csv;
        }

        // Parse the response body into a JavaScript object
        const responseBody = pm.response.text();
        const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(responseJson, ...options);

        // Convert the flattened object to CSV format (using Papa Parse)
        // const csv = Papa.unparse(flattenedObject);

        const csv = arrayOfObjectsToCsv(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        //pm.visualizer.set(JSON.stringify(flattenedObject));
        pm.visualizer.set(csv);
        pm.environment.set("csvData", csv);
        pm.collectionVariables.set("csvData", csv);
    });
});
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['name', 'security', 'public_ips'];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch,
            similarityThreshold,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false
        ) => {

            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                const processMatch = (key, newPath) => {
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

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
                            processMatch(key, newPath);
                        }
                    });

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

            const root = jsonObj[rootKey];

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

                return results;
            } else {
                const {
                    result,
                    explodedArrays
                } = searchKeys(root);
                return explode(result, explodedArrays);
            }
        };

        // Parse the response body into a JavaScript object
        // const responseBody = pm.response.text();
        // const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(dummyJson, 'assets', keysToSearch, 0.9, 'explode', 'stringify', true);

        // Convert the flattened object to CSV format (using Papa Parse)
        const csv = Papa.unparse(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        pm.visualizer.set(JSON.stringify(flattenedObject));
    });
});
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['name', 'security', 'public_ips'];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch,
            similarityThreshold,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false
        ) => {

            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                for (const key in obj) {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    let compareKey = allowDotNotation ? newPath : key;

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
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
                                const finalPath = allowDotNotation ? newPath : key;
                                if (arrayHandling === 'horizontal' && Array.isArray(obj[key])) {
                                    obj[key].forEach((value, index) => {
                                        result[`${finalPath}[${index}]`] = value;
                                    });
                                } else if (arrayHandling === 'explode' && Array.isArray(obj[key])) {
                                    explodedArrays.push({
                                        key: finalPath,
                                        values: obj[key]
                                    });
                                } else {
                                    result[finalPath] = Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : obj[key];
                                }
                            }
                        }
                    });

                    if (typeof obj[key] === 'object') {
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

            const root = jsonObj[rootKey];

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

                return results;
            } else {
                const {
                    result,
                    explodedArrays
                } = searchKeys(root);
                return explode(result, explodedArrays);
            }
        };

        // Parse the response body into a JavaScript object
        // const responseBody = pm.response.text();
        // const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(dummyJson, 'assets', keysToSearch, 0.9, 'explode', 'stringify', true);

        // Convert the flattened object to CSV format (using Papa Parse)
        const csv = Papa.unparse(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        pm.visualizer.set(JSON.stringify(flattenedObject));
    });
});
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['name', 'security', 'public_ips'];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch,
            similarityThreshold,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false
        ) => {

            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                for (const key in obj) {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    let compareKey = allowDotNotation ? newPath : key;

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
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
                        }
                    });

                    if (typeof obj[key] === 'object') {
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

            const root = jsonObj[rootKey];

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

                return results;
            } else {
                const {
                    result,
                    explodedArrays
                } = searchKeys(root);
                return explode(result, explodedArrays);
            }
        };

        // Parse the response body into a JavaScript object
        // const responseBody = pm.response.text();
        // const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(dummyJson, 'assets', keysToSearch, 0.9, 'explode', 'stringify', true);

        // Convert the flattened object to CSV format (using Papa Parse)
        const csv = Papa.unparse(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        pm.visualizer.set(JSON.stringify(flattenedObject));
    });
});
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['name', 'security', 'public_ips'];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch,
            similarityThreshold,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false
        ) => {
            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                for (const key in obj) {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    let compareKey = allowDotNotation ? newPath : key;

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
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
                        }
                    });

                    if (typeof obj[key] === 'object') {
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

            const root = jsonObj[rootKey];

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

                return results;
            } else {
                const {
                    result,
                    explodedArrays
                } = searchKeys(root);
                return explode(result, explodedArrays);
            }
        };

        // Parse the response body into a JavaScript object
        // const responseBody = pm.response.text();
        // const responseJson = JSON.parse(responseBody);
        const dummyJson = {"assets":[{"name":"object1","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object2","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object3","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object4","public_ips":["example1","example2"]},{"name":"object5","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}}]}

        // Search and flatten using custom function
        const flattenedObject = searchAndFlatten(dummyJson, 'assets', keysToSearch, 0.9, 'explode', 'stringify', true);

        // Convert the flattened object to CSV format (using Papa Parse)
        const csv = Papa.unparse(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        pm.visualizer.set(JSON.stringify(flattenedObject));
    });
});
```

```jsx
//Set keys to look for in the object and return
const keysToSearch = ['name', 'security.score', 'public_ips'];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

//jaccard similarity function
const jaccard = (setA, setB) => {
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
};

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));
    let stringSimilarity = this.stringSimilarity;

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch,
            similarityThreshold,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false
        ) => {
            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                for (const key in obj) {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    let compareKey = allowDotNotation ? newPath : key;

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(compareKey, searchKey);

                        if (similarity >= similarityThreshold) {
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
                        }
                    });

                    if (typeof obj[key] === 'object') {
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

            const root = jsonObj[rootKey];

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

                return results;
            } else {
                const {
                    result,
                    explodedArrays
                } = searchKeys(root);
                return explode(result, explodedArrays);
            }
        };

        // Parse the response body into a JavaScript object
        // const responseBody = pm.response.text();
        // const responseJson = JSON.parse(responseBody);
        const dummyJson = {"assets":[{"name":"object1","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object2","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object3","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object4","public_ips":["example1","example2"]},{"name":"object5","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}}]}

        // Search and flatten using custom function
        const flattenedObject = searchAndFlatten(dummyJson, 'assets', keysToSearch, 0.9, 'explode', 'stringify', true);

        // Convert the flattened object to CSV format (using Papa Parse)
        const csv = Papa.unparse(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        pm.visualizer.set(JSON.stringify(flattenedObject));
    });
});
```

```jsx
//Set keys to look for in the object and return
orcaFields = ["name", "security", "public_ips"];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

//jaccard similarity function
const jaccard = (setA, setB) => {
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
};

pm.sendRequest("https://cdn.jsdelivr.net/npm/string-similarity@4.0/umd/string-similarity.min.js", function(err, res) {
    if (err) {
        console.error(err);
        return;
    }
    // Modify the code to replace all instances of `self` with `this`
    var code = res.text().replace(/self/g, "this");

    // Convert the response to text and save it as an environment variable
    // pm.collectionVariables.set("stringsimilarity", res.text());
    pm.collectionVariables.set("stringsimilarity", code);

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("stringsimilarity"));

    // Make a request to get minified javascript from a CDN for Papa Parse
    pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // Convert the response to text and save it as an environment variable
        pm.collectionVariables.set("papaparse", res.text());

        // Eval will evaluate the JavaScript code and initialize the papaparse object
        eval(pm.collectionVariables.get("papaparse"));
        const Papa = this.Papa;

        //Function definition for searchAndFlatten
        const searchAndFlatten = (
            jsonObj,
            rootKey,
            keysToSearch,
            similarityThreshold,
            arrayHandling = 'stringify',
            objectHandling = 'stringify',
            allowDotNotation = false
        ) => {
            const searchKeys = (obj, currentPath = '', explodedArrays = []) => {
                const result = {};

                for (const key in obj) {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;

                    keysToSearch.forEach((searchKey) => {
                        const similarity = stringSimilarity.compareTwoStrings(newPath, searchKey);

                        if (similarity >= similarityThreshold) {
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
                        }
                    });

                    if (typeof obj[key] === 'object') {
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

            const root = jsonObj[rootKey];

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

                return results;
            } else {
                const {
                    result,
                    explodedArrays
                } = searchKeys(root);
                return explode(result, explodedArrays);
            }
        };

        // Parse the response body into a JavaScript object
        // const responseBody = pm.response.text();
        // const responseJson = JSON.parse(responseBody);
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
        const flattenedObject = searchAndFlatten(dummyJson, "assets", orcaFields);

        // Convert the flattened object to CSV format (using Papa Parse)
        const csv = Papa.unparse(flattenedObject);

        // Output the CSV data to the Postman Visualizer
        pm.visualizer.set(JSON.stringify(flattenedObject));
    });
});
```

```jsx
const searchAndFlatten = (
  jsonObj,
  rootKey,
  keysToSearch,
  similarityThreshold,
  arrayHandling = 'stringify',
  objectHandling = 'stringify'
) => {
  const searchKeys = (obj, explodedArrays = []) => {
    const result = {};

    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        if (objectHandling === 'recurse') {
          const nestedResult = searchKeys(obj[key]);

          for (const nestedKey in nestedResult) {
            result[`${key}.${nestedKey}`] = nestedResult[nestedKey];
          }
        } else if (objectHandling === 'stringify') {
          result[key] = JSON.stringify(obj[key]);
        }
      } else {
        keysToSearch.forEach(searchKey => {
          const similarity = jaccard(
            new Set(key.split('')),
            new Set(searchKey.split(''))
          );

          if (similarity >= similarityThreshold) {
            if (arrayHandling === 'horizontal' && Array.isArray(obj[key])) {
              obj[key].forEach((value, index) => {
                result[`${key}[${index}]`] = value;
              });
            } else if (arrayHandling === 'explode' && Array.isArray(obj[key])) {
              explodedArrays.push({ key, values: obj[key] });
            } else {
              result[key] = Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : obj[key];
            }
          }
        });
      }
    }

    return { result, explodedArrays };
  };

  const generateExplodedResults = (baseObj, explodedArrays) => {
    if (explodedArrays.length === 0) {
      return [baseObj];
    }

    const currentArray = explodedArrays.shift();
    const tempResults = [];

    currentArray.values.forEach(value => {
      const newObj = { ...baseObj, [currentArray.key]: value };
      const combinations = generateExplodedResults(newObj, explodedArrays.slice());
      tempResults.push(...combinations);
    });

    return tempResults;
  };

  const rootNode = jsonObj[rootKey];

  if (!Array.isArray(rootNode)) {
    const { result, explodedArrays } = searchKeys(rootNode);
    return generateExplodedResults(result, explodedArrays);
  } else {
    const results = [];

    rootNode.forEach(node => {
      const { result, explodedArrays } = searchKeys(node);
      results.push(...generateExplodedResults(result, explodedArrays));
    });

    return results;
  }
};
```

```jsx
//Set keys to look for in the object and return
orcaFields = ["name", "security", "public_ips"];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

// Make a request to get minified javascript from a CDN for Fuse.js
pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/fuse.js/6.6.2/fuse.min.js", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  // Convert the response to text and save it as an environment variable
  pm.collectionVariables.set("fusejs", res.text());

  // Eval will evaluate the JavaScript code and initialize the Fuse object
  eval(pm.collectionVariables.get("fusejs"));

  // Make a request to get minified javascript from a CDN for Papa Parse
  pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    // Convert the response to text and save it as an environment variable
    pm.collectionVariables.set("papaparse", res.text());

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("papaparse"));
    const Papa = this.Papa;
    
    //Function definition for searchAndFlatten
    function searchAndFlatten(json, rootKey, searchKeys, fuzziness, arrayHandling = "default") {
        const Fuse = this.Fuse;
        const fuseOptions = {
            includeScore: true,
            threshold: fuzziness,
            keys: searchKeys,
        };

        const findRootNode = new Fuse([json], {
            ...fuseOptions,
            keys: [rootKey]
        });
        const rootNodeResult = findRootNode.search(rootKey);
        const rootNode = rootNodeResult.length ? rootNodeResult[0].item[rootKey] : [];

        const flattenObject = (obj, prefix = "") => {
            let result = {};
            for (const key in obj) {
                const newKey = prefix ? `${prefix}.${key}` : key;

                if (Array.isArray(obj[key])) {
                    switch (arrayHandling) {
                        case "default":
                            obj[key].forEach((value, index) => {
                                result[`${newKey}[${index}]`] = value;
                            });
                            break;
                        case "explode":
                            result[newKey] = obj[key];
                            break;
                        case "stringify":
                            result[newKey] = JSON.stringify(obj[key]);
                            break;
                        default:
                            throw new Error("Invalid array handling option");
                    }
                } else if (typeof obj[key] === "object") {
                    Object.assign(result, flattenObject(obj[key], newKey));
                } else {
                    result[newKey] = obj[key];
                }
            }
            return result;
        };

        const flattenedObjects = rootNode.map((obj) => {
            const flatObj = flattenObject(obj);
            const filteredObj = {};

            const fuse = new Fuse(Object.keys(flatObj), fuseOptions);
            searchKeys.forEach((searchKey) => {
                const matches = fuse.search(searchKey);
                if (matches.length) {
                    const matchedKey = matches[0].item;
                    filteredObj[matchedKey] = flatObj[matchedKey];
                }
            });

            return filteredObj;
        });

        if (arrayHandling === "explode") {
            const explodedObjects = [];

            flattenedObjects.forEach((obj) => {
                const arrays = Object.entries(obj).filter(([_, value]) => Array.isArray(value));

                if (arrays.length) {
                    const [key, values] = arrays[0];
                    values.forEach((value) => {
                        const newObj = {
                            ...obj,
                            [key]: value
                        };
                        explodedObjects.push(newObj);
                    });
                } else {
                    explodedObjects.push(obj);
                }
            });

            return explodedObjects;
        }

        return flattenedObjects;
    }

    // Parse the response body into a JavaScript object
    // const responseBody = pm.response.text();
    // const responseJson = JSON.parse(responseBody);
    const dummyJson = {"assets":[{"name":"object1","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object2","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object3","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object4","public_ips":["example1","example2"]},{"name":"object5","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}}]}

    // Search and flatten using custom function
    const flattenedObject = searchAndFlatten(dummyJson, "assets", orcaFields);

    // Convert the flattened object to CSV format (using Papa Parse)
    const csv = Papa.unparse(flattenedObject);

    // Output the CSV data to the Postman Visualizer
    pm.visualizer.set(JSON.stringify(flattenedObject));
  });
});
```

```jsx
//Set keys to look for in the object and return
orcaFields = ["name", "security", "public_ips"];
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

// Make a request to get minified javascript from a CDN for Fuse.js
pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/fuse.js/6.6.2/fuse.min.js", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  // Convert the response to text and save it as an environment variable
  pm.collectionVariables.set("fusejs", res.text());

  // Eval will evaluate the JavaScript code and initialize the Fuse object
  eval(pm.collectionVariables.get("fusejs"));

  // Make a request to get minified javascript from a CDN for Papa Parse
  pm.sendRequest("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.0/papaparse.min.js", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    // Convert the response to text and save it as an environment variable
    pm.collectionVariables.set("papaparse", res.text());

    // Eval will evaluate the JavaScript code and initialize the papaparse object
    eval(pm.collectionVariables.get("papaparse"));
    const Papa = this.Papa;
    
    //Function definition for searchAndFlatten
    function searchAndFlatten(json, rootKey, searchKeys, fuzziness, arrayHandling = "default") {
        const Fuse = this.Fuse;
        const fuseOptions = {
            includeScore: true,
            threshold: fuzziness,
            keys: searchKeys,
        };

        const findRootNode = new Fuse([json], {
            ...fuseOptions,
            keys: [rootKey]
        });
        const rootNodeResult = findRootNode.search(rootKey);
        const rootNode = rootNodeResult.length ? rootNodeResult[0].item[rootKey] : [];

        const flattenObject = (obj, prefix = "") => {
            let result = {};
            for (const key in obj) {
                const newKey = prefix ? `${prefix}.${key}` : key;

                if (Array.isArray(obj[key])) {
                    switch (arrayHandling) {
                        case "default":
                            obj[key].forEach((value, index) => {
                                result[`${newKey}[${index}]`] = value;
                            });
                            break;
                        case "explode":
                            result[newKey] = obj[key];
                            break;
                        case "stringify":
                            result[newKey] = JSON.stringify(obj[key]);
                            break;
                        default:
                            throw new Error("Invalid array handling option");
                    }
                } else if (typeof obj[key] === "object") {
                    Object.assign(result, flattenObject(obj[key], newKey));
                } else {
                    result[newKey] = obj[key];
                }
            }
            return result;
        };

        const flattenedObjects = rootNode.map((obj) => {
            const flatObj = flattenObject(obj);
            const filteredObj = {};

            const fuse = new Fuse(Object.keys(flatObj), fuseOptions);
            searchKeys.forEach((searchKey) => {
                const matches = fuse.search(searchKey);
                if (matches.length) {
                    const matchedKey = matches[0].item;
                    filteredObj[matchedKey] = flatObj[matchedKey];
                }
            });

            return filteredObj;
        });

        if (arrayHandling === "explode") {
            const explodedObjects = [];

            flattenedObjects.forEach((obj) => {
                const arrays = Object.entries(obj).filter(([_, value]) => Array.isArray(value));

                if (arrays.length) {
                    const [key, values] = arrays[0];
                    values.forEach((value) => {
                        const newObj = {
                            ...obj,
                            [key]: value
                        };
                        explodedObjects.push(newObj);
                    });
                } else {
                    explodedObjects.push(obj);
                }
            });

            return explodedObjects;
        }

        return flattenedObjects;
    }

    // Parse the response body into a JavaScript object
    // const responseBody = pm.response.text();
    // const responseJson = JSON.parse(responseBody);
    const dummyJson = {"assets":[{"name":"object1","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object2","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object3","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object4","public_ips":["example1","example2"]},{"name":"object5","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}}]}

    // Search and flatten using custom function
    const flattenedObject = searchAndFlatten(dummyJson, "assets", orcaFields);

    // Convert the flattened object to CSV format (using Papa Parse)
    const csv = Papa.unparse(flattenedObject);

    // Output the CSV data to the Postman Visualizer
    pm.visualizer.set(JSON.stringify(flattenedObject));
  });
});
```

```jsx
function searchAndFlatten(json, rootKey, searchKeys, fuzziness, arrayHandling = "default") {
  const fuseOptions = {
    includeScore: true,
    threshold: fuzziness,
    keys: searchKeys,
  };

  const findRootNode = new Fuse([json], { ...fuseOptions, keys: [rootKey] });
  const rootNodeResult = findRootNode.search(rootKey);
  const rootNode = rootNodeResult.length ? rootNodeResult[0].item[rootKey] : [];

  const flattenObject = (obj, prefix = "") => {
    let result = {};
    for (const key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(obj[key])) {
        switch (arrayHandling) {
          case "default":
            obj[key].forEach((value, index) => {
              result[`${newKey}[${index}]`] = value;
            });
            break;
          case "explode":
            result[newKey] = obj[key];
            break;
          case "stringify":
            result[newKey] = JSON.stringify(obj[key]);
            break;
          default:
            throw new Error("Invalid array handling option");
        }
      } else if (typeof obj[key] === "object") {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
    return result;
  };

  const flattenedObjects = rootNode.map((obj) => {
    const flatObj = flattenObject(obj);
    const filteredObj = {};

    const fuse = new Fuse(Object.keys(flatObj), fuseOptions);
    searchKeys.forEach((searchKey) => {
      const matches = fuse.search(searchKey);
      if (matches.length) {
        const matchedKey = matches[0].item;
        filteredObj[matchedKey] = flatObj[matchedKey];
      }
    });

    return filteredObj;
  });

  if (arrayHandling === "explode") {
    const explodedObjects = [];

    flattenedObjects.forEach((obj) => {
      const arrays = Object.entries(obj).filter(([_, value]) => Array.isArray(value));

      if (arrays.length) {
        const [key, values] = arrays[0];
        values.forEach((value) => {
          const newObj = { ...obj, [key]: value };
          explodedObjects.push(newObj);
        });
      } else {
        explodedObjects.push(obj);
      }
    });

    return explodedObjects;
  }

  return flattenedObjects;
}
```

```jsx
function searchAndFlatten(json, rootKey, keysToFind) {
    const rows = [];

    // Search for root key
    if (json.hasOwnProperty(rootKey)) {
        search(json[rootKey], keysToFind, {}, "");
    }

    function search(node, keysToFind, results, parentKey) {
        // Base case: node is not an object or array
        if (typeof node !== "object" || node === null) {
            if (Object.keys(results).length > 0) {
                rows.push(flatten(results));
            }
            return;
        }

        // Handle arrays
        if (Array.isArray(node)) {
            node.forEach((value, index) => {
                const fullKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;
                search(value, keysToFind, {}, fullKey);
            });
            return;
        }

        // Iterate over node's keys and values
        for (const [key, value] of Object.entries(node)) {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;

            // Check if the current key matches any of the keys we're looking for
            if (keysToFind.includes(fullKey)) {
                results[fullKey] = value;
            }

            // Recurse into object or array
            search(value, keysToFind, results, fullKey);

            // Remove key from results to prevent it from being included in next row
            if (keysToFind.includes(fullKey)) {
                delete results[fullKey];
            }
        }
    }

    return rows;

    // Helper function to flatten an object
    function flatten(obj, prefix = "") {
        const flattened = {};

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === "object" && value !== null) {
                const flatObject = flatten(value, `${prefix}${key}.`);
                Object.assign(flattened, flatObject);
            } else {
                flattened[`${prefix}${key}`] = value;
            }
        }

        return flattened;
    }
}
```

```jsx
function searchAndFlatten(json, rootKey, keysToFind) {
  const rows = [];

  // Search for root key
  if (json.hasOwnProperty(rootKey)) {
    search(json[rootKey], keysToFind, {}, "");
  }

  function search(node, keysToFind, results, parentKey) {
    // Base case: node is not an object or array
    if (typeof node !== "object" || node === null) {
      if (Object.keys(results).length > 0) {
        rows.push(flatten(results));
      }
      return;
    }

    // Handle arrays
    if (Array.isArray(node)) {
      node.forEach((value, index) => {
        const fullKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;
        search(value, keysToFind, {}, fullKey);
      });
      return;
    }

    // Iterate over node's keys and values
    for (const [key, value] of Object.entries(node)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the current key matches any of the keys we're looking for
      if (keysToFind.includes(fullKey)) {
        results[fullKey] = value;
      }

      // Recurse into object or array
      search(value, keysToFind, results, fullKey);

      // Remove key from results to prevent it from being included in next row
      if (keysToFind.includes(fullKey)) {
        delete results[fullKey];
      }
    }
  }

  return rows;

  // Helper function to flatten an object
  function flatten(obj, prefix = "") {
    const flattened = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        const flatObject = flatten(value, `${prefix}${key}.`);
        Object.assign(flattened, flatObject);
      } else {
        flattened[`${prefix}${key}`] = value;
      }
    }

    return flattened;
  }
}
```

# Search and Flatten Function with Jaccard (BROKEN)

```jsx
function searchAndFlatten(json, rootKey, keysToFind, similarityThreshold, arrayHandling = "default") {
    let rows = [];

    // Check if root key exists and is an array
    if (json.hasOwnProperty(rootKey) && Array.isArray(json[rootKey])) {
        // Handle array based on arrayHandling parameter
        if (arrayHandling === "default") {
            // Flatten each object in the array and add to rows
            json[rootKey].forEach((node) => {
                let results = {};
                search(node, keysToFind, results, "");
                rows.push(flatten(results));
            });
        } else if (arrayHandling === "explode") {
            // Create new object for each element in array
            json[rootKey].forEach((node) => {
                search(node, keysToFind, {}, "");
            });
        } else if (arrayHandling === "stringify") {
            // Stringify array value
            json[rootKey].forEach((node) => {
                let results = {};
                search(node, keysToFind, results, "");
                Object.keys(results).forEach((key) => {
                    if (Array.isArray(results[key])) {
                        results[key] = JSON.stringify(results[key]);
                    }
                });
                rows.push(flatten(results));
            });
        }
    } else if (json.hasOwnProperty(rootKey)) {
        // Search for root key
        let results = {};
        search(json[rootKey], keysToFind, results, "");
        rows.push(flatten(results));
    }

    return rows;

    function search(node, keysToFind, results, parentKey) {
        // Base case: node is not an object or array
        if (typeof node !== "object" || node === null) {
            if (Object.keys(results).length > 0) {
                rows.push(flatten(results));
            }
            return;
        }

        // Handle arrays based on arrayHandling parameter
        if (Array.isArray(node)) {
            if (arrayHandling === "default") {
                node.forEach((value, index) => {
                    const fullKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;
                    search(value, keysToFind, {}, fullKey);
                });
            } else if (arrayHandling === "explode") {
                node.forEach((value, index) => {
                    const fullKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;
                    search(value, keysToFind, {}, "");
                    if (Object.keys(results).length > 0) {
                        rows.push(flatten(results));
                    }
                    results = {};
                });
                return;
            } else if (arrayHandling === "stringify") {
                results[parentKey] = JSON.stringify(node);
                return;
            }
        }

        // Iterate over node's keys and values
        for (const [key, value] of Object.entries(node)) {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;

            // Check if the current key matches any of the keys we're looking for
            const keyMatches = keysToFind.some((searchKey) => {
                // Calculate Jaccard similarity between the search key and the full key
                const searchTokens = searchKey.toLowerCase().split("");
                const fullTokens = fullKey.toLowerCase().split("");
                const intersection = new Set(searchTokens.filter((token) => fullTokens.includes(token)));
                const union = new Set([...searchTokens, ...fullTokens]);
                const jaccard = intersection.size / union.size;

                return jaccard > similarityThreshold;
            });

            if (keyMatches) {
                results[fullKey] = value;
            }

            // Recurse into object or array
            search(value, keysToFind, results, fullKey);

            // Remove key from results to prevent it from being included in next row
            if (keyMatches) {
                delete results[fullKey];
            }
        }
    }

    // Helper function to flatten an object
    function flatten(obj, prefix = "") {
        const flattened = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === "object" && value !== null) {
                const flatObject = flatten(value, `${prefix}${key}.`);
                Object.assign(flattened, flatObject);
            } else {
                flattened[`${prefix}${key}`] = value;
            }
        }

        return flattened;
    }

    return rows;

    
}
```

```jsx
function searchAndFlatten(json, rootKey, keysToFind, similarityThreshold, searchType = "default") {
  const results = [];

  // Search for root key
  if (json.hasOwnProperty(rootKey)) {
    const rootNode = json[rootKey];
    if (Array.isArray(rootNode)) {
      for (let i = 0; i < rootNode.length; i++) {
        const node = rootNode[i];
        const searchResult = search(node, keysToFind, similarityThreshold, searchType);
        if (Object.keys(searchResult).length > 0) {
          results.push(searchResult);
        }
      }
    } else {
      const searchResult = search(rootNode, keysToFind, similarityThreshold, searchType);
      if (Object.keys(searchResult).length > 0) {
        results.push(searchResult);
      }
    }
  }

  function search(node, keysToFind, similarityThreshold, searchType, parentKey = "") {
    const results = {};

    // Base case: node is not an object or array
    if (typeof node !== "object" || node === null) {
      return results;
    }

    // Iterate over node's keys and values
    for (const [key, value] of Object.entries(node)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (keysToFind.includes(key)) {
        results[fullKey] = value;
      } else if (searchType === "explode" && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const searchResult = search(value[i], keysToFind, similarityThreshold, searchType, `${fullKey}[${i}]`);
          if (Object.keys(searchResult).length > 0) {
            Object.assign(results, searchResult);
          }
        }
      } else if (searchType === "stringify" && Array.isArray(value)) {
        results[fullKey] = JSON.stringify(value);
      } else {
        const jaccard = calculateJaccardSimilarity(keysToFind, fullKey);
        if (jaccard > similarityThreshold) {
          results[fullKey] = value;
        }
        // Recurse into object or array
        const searchResult = search(value, keysToFind, similarityThreshold, searchType, fullKey);
        if (Object.keys(searchResult).length > 0) {
          Object.assign(results, searchResult);
        }
      }
    }

    return results;
  }

  return results;
}

function calculateJaccardSimilarity(set1, set2) {
  const set1Tokens = new Set(set1.toLowerCase().split(""));
  const set2Tokens = new Set(set2.toLowerCase().split(""));
  const intersection = new Set([...set1Tokens].filter(x => set2Tokens.has(x)));
  const union = new Set([...set1Tokens, ...set2Tokens]);
  const jaccard = intersection.size / union.size;
  return jaccard;
}
```

```jsx
function searchAndFlatten(json, rootKey, keysToFind, similarityThreshold, searchType = "default") {
  const results = [];

  // Search for root key
  if (json.hasOwnProperty(rootKey)) {
    const rootNode = json[rootKey];
    if (Array.isArray(rootNode)) {
      for (let i = 0; i < rootNode.length; i++) {
        const node = rootNode[i];
        const searchResult = search(node, keysToFind, similarityThreshold, searchType);
        if (Object.keys(searchResult).length > 0) {
          results.push(searchResult);
        }
      }
    } else {
      const searchResult = search(rootNode, keysToFind, similarityThreshold, searchType);
      if (Object.keys(searchResult).length > 0) {
        results.push(searchResult);
      }
    }
  }

  function search(node, keysToFind, similarityThreshold, searchType, parentKey = "") {
    const results = {};

    // Base case: node is not an object or array
    if (typeof node !== "object" || node === null) {
      return results;
    }

    // Iterate over node's keys and values
    for (const [key, value] of Object.entries(node)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (keysToFind.includes(key)) {
        results[fullKey] = value;
      } else if (searchType === "explode" && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const searchResult = search(value[i], keysToFind, similarityThreshold, searchType, `${fullKey}[${i}]`);
          if (Object.keys(searchResult).length > 0) {
            Object.assign(results, searchResult);
          }
        }
      } else if (searchType === "stringify" && Array.isArray(value)) {
        results[fullKey] = JSON.stringify(value);
      } else {
        const jaccard = calculateJaccardSimilarity(keysToFind, fullKey);
        if (jaccard > similarityThreshold) {
          results[fullKey] = value;
        }
        // Recurse into object or array
        const searchResult = search(value, keysToFind, similarityThreshold, searchType, fullKey);
        if (Object.keys(searchResult).length > 0) {
          Object.assign(results, searchResult);
        }
      }
    }

    return results;
  }

  return results;
}
```

```jsx
function searchAndFlatten(json, rootKey, keysToFind, similarityThreshold, parseOption = "default") {
  if (Array.isArray(json[rootKey])) {
    // If root key is an array, flatten each object in the array
    const results = json[rootKey].map((obj) => flatten(obj, parseOption));
    return [].concat(...results);
  } else {
    // If root key is an object, flatten the object
    return flatten(json[rootKey], parseOption);
  }

  function flatten(object, parseOption) {
    const flattened = {};

    function handleArray(array, fullPath) {
      if (parseOption === "explode") {
        // Explode array values into separate objects
        array.forEach((value, i) => {
          flattenHelper(value, `${fullPath}[${i}]`);
        });
      } else if (parseOption === "stringify") {
        // Stringify array values
        flattened[fullPath] = JSON.stringify(array);
      } else {
        // Default: create separate keys for each array element
        array.forEach((value, i) => {
          flattened[`${fullPath}[${i}]`] = value;
        });
      }
    }

    function flattenHelper(object, path) {
      Object.entries(object).forEach(([key, value]) => {
        const fullPath = path ? `${path}.${key}` : key;

        if (Array.isArray(value)) {
          handleArray(value, fullPath);
        } else if (typeof value === "object" && value !== null) {
          flattenHelper(value, fullPath);
        } else {
          flattened[fullPath] = value;
        }

        // Check if the current key matches any of the keys we're looking for
        const keyMatches = keysToFind.some((searchKey) => {
          // Calculate Jaccard similarity between the search key and the full key
          const searchTokens = searchKey.toLowerCase().split("");
          const fullTokens = fullPath.toLowerCase().split("");
          const intersection = new Set(searchTokens.filter((token) => fullTokens.includes(token)));
          const union = new Set([...searchTokens, ...fullTokens]);
          const jaccard = intersection.size / union.size;

          return jaccard > similarityThreshold;
        });

        if (keyMatches) {
          flattened[fullPath] = value;
        }
      });
    }

    if (parseOption === "stringify") {
      // Stringify all values
      for (const [key, value] of Object.entries(flattened)) {
        flattened[key] = JSON.stringify(value);
      }
    }

    return flattened;
  }
}
```

```jsx
function searchAndFlatten(json, rootKey, keysToFind, similarityThreshold) {
  const rows = [];

  // Search for root key
  if (json.hasOwnProperty(rootKey)) {
    search(json[rootKey], keysToFind, {}, "");
  }

  function search(node, keysToFind, results, parentKey) {
    // Base case: node is not an object or array
    if (typeof node !== "object" || node === null) {
      if (Object.keys(results).length > 0) {
        rows.push(flatten(results));
      }
      return;
    }

    // Handle arrays
    if (Array.isArray(node)) {
      node.forEach((value, index) => {
        const fullKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;
        search(value, keysToFind, {}, fullKey);
      });
      return;
    }

    // Iterate over node's keys and values
    for (const [key, value] of Object.entries(node)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the current key matches any of the keys we're looking for
      const keyMatches = keysToFind.some((searchKey) => {
        // Calculate Jaccard similarity between the search key and the full key
        const searchTokens = searchKey.toLowerCase().split("");
        const fullTokens = fullKey.toLowerCase().split("");
        const intersection = new Set(searchTokens.filter((token) => fullTokens.includes(token)));
        const union = new Set([...searchTokens, ...fullTokens]);
        const jaccard = intersection.size / union.size;

        return jaccard > similarityThreshold;
      });

      if (keyMatches) {
        results[fullKey] = value;
      }

      // Recurse into object or array
      search(value, keysToFind, results, fullKey);

      // Remove key from results to prevent it from being included in next row
      if (keyMatches) {
        delete results[fullKey];
      }
    }
  }

  return rows;

  // Helper function to flatten an object
  function flatten(obj, prefix = "") {
    const flattened = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        const flatObject = flatten(value, `${prefix}${key}.`);
        Object.assign(flattened, flatObject);
      } else {
        flattened[`${prefix}${key}`] = value;
      }
    }

    return flattened;
  }
}
```

# ChatGPT Convo

Here's what I want to do, and either I need to create my functions to do so or find a library that does it in Javascript. I want to be able to "fuzzily" search for a key that will be the "root" node. Then, I want to "fuzzily" find keys within that object below the root node. This will be done with an array of keys to go find. The function should then recursively go through the object and find instances of the key. The resulting JSON object should be completely flattened and exploded, and only the fuzzily searched and selected values should be included in the result. In fact, the result should essentially be an object with all of the fuzzily selected key value pairs.

Here's the issue. I'm trying to create a process to convert a large JSON object like the one I've showed into a CSV file.  In this case, "assets" would be different instances of rows or entities, and the keys that I search for and find should be the column names or header row. Is there a way for me to handle the differing cases of returning an array of JSON objects versus returning one object. What is returned by this function will then be fed into "Papa.unparse" to turn it into a CSV.

Here's the dummy JSON object:

const dummyJson = {"assets":[{"name":"object1","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object2","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object3","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}},{"name":"object4","public_ips":["example1","example2"]},{"name":"object5","public_ips":["example1","example2"],"security":{"score":"good","provider":"sec"}}]}

Here's the search params: orcaFields = ["name", "score", "security", "public_ips"];

Here's the function being called:

// Search and flatten using custom function
const flattenedObject = searchAndFlatten(dummyJson, "assets", orcaFields, 0.9);

I also need to allow the function to take an extra argument that tells it to handle the parsing of the Json object with 3 possible options:

1. default - which is what youve done here where searched keys that have arrays as values are flattened with elements in that array becoming new keys like public_ips[0] and public_ips[1]
2. explode - instead of turning keys that have arrays into additional keys, create a new object for each additional element in the key. For public_ips, this means you would have 2 objects created (one with example1 for public_ips and one with example2 for public_ips).
3. stringify - instead of creating new objects (explode) or creating additional keys for each object, simply stringify the array of value. For object1, this means you would have "public_ips":"[example1, example2]"