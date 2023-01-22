// type Email = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
// regex type would be a template literal type needing to be defined

interface UserProps {
  address: string;
  chain: string;
  email?: string;
}
