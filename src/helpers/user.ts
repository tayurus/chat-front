export function getUserFIOByData(params: {
  first_name: string;
  last_name: string;
}) {
  return `${params.last_name} ${params.first_name}`;
}
