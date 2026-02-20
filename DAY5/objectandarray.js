// ===============================
// Beginner 1
// ===============================
function getUserInitials(user) {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
}

// ===============================
// Beginner 2
// ===============================
function countProperties(obj) {
  return Object.keys(obj).length;
}

// ===============================
// Beginner 3
// ===============================
function invertObject(obj) {
  const result = {};
  for (let key in obj) {
    result[obj[key]] = key;
  }
  return result;
}

// ===============================
// Beginner 4
// ===============================
function removeFalsyValues(arr) {
  return arr.filter(Boolean);
}

// ===============================
// Easy 5
// ===============================
function groupByAge(people) {
  return people.reduce((acc, person) => {
    acc[person.age] = acc[person.age] || [];
    acc[person.age].push(person);
    return acc;
  }, {});
}

// ===============================
// Easy 6
// ===============================
function findMostFrequentElement(arr) {
  const freq = {};
  let max = 0;
  let result = null;

  for (let val of arr) {
    freq[val] = (freq[val] || 0) + 1;
    if (freq[val] > max) {
      max = freq[val];
      result = val;
    }
  }
  return result;
}

// ===============================
// Easy 7
// ===============================
function flatten(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
}

// ===============================
// Medium 8
// ===============================
function mergeObjects(...objects) {
  const result = {};

  for (let obj of objects) {
    for (let key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        result[key] = mergeObjects(result[key] || {}, obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

// ===============================
// Medium 9
// ===============================
function rotateArray(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, arr.length - k)];
}

// ===============================
// Medium 10
// ===============================
function intersection(nums1, nums2) {
  const set = new Set(nums1);
  return [...new Set(nums2.filter(n => set.has(n)))];
}

// ===============================
// Medium 11
// ===============================
function groupAnagrams(words) {
  const map = {};

  for (let word of words) {
    const key = word.split("").sort().join("");
    map[key] = map[key] || [];
    map[key].push(word);
  }
  return Object.values(map);
}

// ===============================
// Medium-Hard 12
// ===============================
function moveZerosToEnd(arr) {
  let index = 0;

  for (let num of arr) {
    if (num !== 0) arr[index++] = num;
  }

  while (index < arr.length) {
    arr[index++] = 0;
  }
  return arr;
}

// ===============================
// Hard 13
// ===============================
function longestConsecutiveSequence(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (let num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let streak = 1;

      while (set.has(current + 1)) {
        current++;
        streak++;
      }
      longest = Math.max(longest, streak);
    }
  }
  return longest;
}

// ===============================
// Hard 14
// ===============================
function productExceptSelf(nums) {
  const result = Array(nums.length).fill(1);
  let left = 1, right = 1;

  for (let i = 0; i < nums.length; i++) {
    result[i] *= left;
    left *= nums[i];
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }

  return result;
}

// ===============================
// Hard 15
// ===============================
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null)
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => deepEqual(a[key], b[key]));
}

// ===============================
// Hard 16
// ===============================
function serializeObject(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value === undefined) return { __type: "undefined" };
    if (value instanceof Date)
      return { __type: "Date", value: value.toISOString() };
    if (value instanceof Map)
      return { __type: "Map", value: [...value] };
    if (value instanceof Set)
      return { __type: "Set", value: [...value] };
    return value;
  });
}

function deserializeObject(str) {
  return JSON.parse(str, (key, value) => {
    if (value?.__type === "undefined") return undefined;
    if (value?.__type === "Date") return new Date(value.value);
    if (value?.__type === "Map") return new Map(value.value);
    if (value?.__type === "Set") return new Set(value.value);
    return value;
  });
}