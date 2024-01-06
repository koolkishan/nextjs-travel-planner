export function removeHtmlTags(inputString: string) {
  // Define a regular expression pattern to match HTML tags
  const htmlTagsRegex = /<[^>]*>/g;

  // Replace HTML tags with an empty string
  const stringWithoutHtml = inputString.replace(htmlTagsRegex, "");

  return stringWithoutHtml;
}
