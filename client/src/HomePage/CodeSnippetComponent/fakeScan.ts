// Pure theatre: a fictional port table for a fictional host.
// Uses only a reserved example hostname; nothing here touches the network.
export const FAKE_HOST = "resume.example";

export const FAKE_SCAN_LINES: string[] = [
  "Starting fake-nmap (theatre edition) against resume.example",
  "PORT      STATE     SERVICE   NOTE",
  '443/tcp   open      https     "career"',
  '8080/tcp  open      http-alt  "side-projects"',
  '22/tcp    filtered  ssh       "social-life"',
  '25/tcp    closed    smtp      "spam-tolerance"',
  '1337/tcp  open      elite     "coffee"',
  "Done: 1 host (192.0.2.1), 5 ports. Nothing was scanned.",
];
