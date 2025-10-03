// utils/bibtex.ts

type Pub = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
};

// A simple function to format author names for BibTeX (e.g., "Kouadio, K. L.; Liu, J." -> "Kouadio, K. L. and Liu, J.")
const formatAuthors = (authors: string): string => {
  return authors.split(';').map(author => author.trim()).join(' and ');
};

// A simple function to create a citation key (e.g., "Kouadio2025Mixture")
const createCiteKey = (authors: string, year: number, title: string): string => {
    const lastName = authors.split(',')[0].trim();
    const firstWord = title.split(' ')[0];
    return `${lastName}${year}${firstWord}`;
};

export function generateBibtex(pubs: Pub[]): string {
  let bibtexString = '';

  pubs.forEach(pub => {
    const citeKey = createCiteKey(pub.authors, pub.year, pub.title);
    
    bibtexString += `@article{${citeKey},\n`;
    bibtexString += `  author  = {${formatAuthors(pub.authors)}},\n`;
    bibtexString += `  title   = {${pub.title}},\n`;
    bibtexString += `  journal = {${pub.venue}},\n`;
    bibtexString += `  year    = {${pub.year}},\n`;
    if (pub.doi) {
      bibtexString += `  doi     = {${pub.doi}}\n`;
    }
    bibtexString += `}\n`;
    if (pub.url) {
      bibtexString += `  url     = {${pub.url}}\n`;
    }
    bibtexString += `}\n\n`;
  });

  return bibtexString;
}