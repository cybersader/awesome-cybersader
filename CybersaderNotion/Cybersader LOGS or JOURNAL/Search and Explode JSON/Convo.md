# Convo

## Handling arrays

- Stringify
- Explode / Cross Join / Duplicate objects / Vertical
- Horizontal / Create new columns for extra instances

## Handling Objects

- Stringify
- Explode

**For array handling - 3 options:**

1) Stringify

- `"public_ips": "[\"example1\",\"example2\"]",`

2) Explode / Cross Join / Duplicate objects / Vertical

- Objects need to be duplicated for every instance of a new element in each array. I understand that this also means 2 arrays with 5 elements will duplicate the object into 25 new objects. This is intended behavior.
- object 1 would become:
    
    ```jsx
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
      },
    ```
    

3) Horizontal / Create new columns for extra instances

- Same as the previous defautl behavior
    
    ```jsx
    {
        "name": "object1",
        "public_ips[0]": "example1",
        "public_ips[1]": "example2",
        "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
      },
    ```
    

**For object handling - 2 options:**

1) Stringify 

- The value for “security” is turned into a string with the object
    
    ```jsx
    [
      {
        "name": "object1",
        "public_ips[0]": "example1",
        "public_ips[1]": "example2",
        "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
      },
    ```
    

2) Recurse

- This was the default behavior before.
- The value for “security” is broken out into each of its child/leafs using the dot notation for keys
    
    ```jsx
    {
        "name": "object1",
        "public_ips": "[\"example1\",\"example2\"]",
        "security.score": "good",
        "security.provider": "sec"
      },
    ```
    

The default for both should instead be changed to stringify.

## Expansion Options

### Default

```jsx
[
  {
    "name": "object1",
    "public_ips[0]": "example1",
    "public_ips[1]": "example2",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  },
  {
    "name": "object2",
    "public_ips[0]": "example1",
    "public_ips[1]": "example2",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  },
  {
    "name": "object3",
    "public_ips[0]": "example1",
    "public_ips[1]": "example2",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  },
  {
    "name": "object4",
    "public_ips[0]": "example1",
    "public_ips[1]": "example2"
  },
  {
    "name": "object5",
    "public_ips[0]": "example1",
    "public_ips[1]": "example2",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  }
]
```

### Explode

```jsx
[
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
  },
  {
    "name": "object2",
    "public_ips": {
      "0": "example1",
      "1": "example2"
    },
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object2",
    "public_ips":"example1",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object2",
    "public_ips":"example2",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object3",
    "public_ips":"example1",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object3",
    "public_ips":"example2",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object4",
    "public_ips":"example1"
  },
  {
    "name": "object4",
    "public_ips":"example2"
  },
  {
    "name": "object5",
    "public_ips":"example1",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object5",
    "public_ips":"example2",
    "security.score": "good",
    "security.provider": "sec"
  }
]
```

### Stringify

```jsx
[
  {
    "name": "object1",
    "public_ips": "[\"example1\",\"example2\"]",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  },
  {
    "name": "object2",
    "public_ips": "[\"example1\",\"example2\"]",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  },
  {
    "name": "object3",
    "public_ips": "[\"example1\",\"example2\"]",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  },
  {
    "name": "object4",
    "public_ips": "[\"example1\",\"example2\"]"
  },
  {
    "name": "object5",
    "public_ips": "[\"example1\",\"example2\"]",
    "security": "\"security\": {\"score\": \"good\",\"provider\": \"sec\"}"
  }
]
```

### Object-recurse

```jsx
[
  {
    "name": "object1",
    "public_ips": "[\"example1\",\"example2\"]",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object2",
    "public_ips": "[\"example1\",\"example2\"]",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object3",
    "public_ips": "[\"example1\",\"example2\"]",
    "security.score": "good",
    "security.provider": "sec"
  },
  {
    "name": "object4",
    "public_ips": "[\"example1\",\"example2\"]"
  },
  {
    "name": "object5",
    "public_ips": "[\"example1\",\"example2\"]",
    "security.score": "good",
    "security.provider": "sec"
  }
]
```

### Full Recurse