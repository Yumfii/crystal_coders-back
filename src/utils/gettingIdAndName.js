function removeFileExtension(payload) {
  const dotIndex = payload.lastIndexOf('.');
  if (dotIndex !== -1) {
    return payload.substring(0, dotIndex);
  } else {
    return payload;
  }
}

export function idAndNameReturn(payload) {
  const partitioningIntoAnArray = payload.split('/');
  const file = removeFileExtension(
    partitioningIntoAnArray[partitioningIntoAnArray.length - 1],
  );
  console.log({
    name: partitioningIntoAnArray[3],
    idPhoto: file,
  });

  return {
    name: partitioningIntoAnArray[3],
    idPhoto: file,
  };
}

// idAndNameReturn(
//   'https://res.cloudinary.com/dr0xueg6r/image/upload/v1726026334/lhi7v9mcmea8ptk97wvz.jpg',
// );
