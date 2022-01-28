export default function sortVoting(arr, params={}) {
  const {
    asc=false
  } = params;

  return (
    arr
    // REPLACED ">" & "<" with "-", to make it work on chrome
    .sort((a, b) => (
      asc
        ? (a.upvotes.length-a.downvotes.length) - (b.upvotes.length-b.downvotes.length)
        : (b.upvotes.length-b.downvotes.length) - (a.upvotes.length-a.downvotes.length)
    ))
  );
}