function destroyObjs(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].destroy();
  }
}

export default destroyObjs;