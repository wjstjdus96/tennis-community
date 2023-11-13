export function deduplicateWriting(writingIdArray: string[]) {
  if (writingIdArray == undefined) return [];
  const splitedArray = writingIdArray.map((writingIdArray) => {
    return writingIdArray.split("+")[0];
  });
  return splitedArray.filter((id, idx) => {
    return splitedArray.indexOf(id) === idx;
  });
}
