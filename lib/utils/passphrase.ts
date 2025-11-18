// Mock passphrase generation for magic link authentication
// In production, this would use a proper wordlist and cryptographic randomness

const WORDLIST = [
  'apple', 'banana', 'cherry', 'dragon', 'eagle', 'falcon',
  'garden', 'harbor', 'island', 'jungle', 'kitten', 'lemon',
  'mountain', 'noble', 'ocean', 'palace', 'queen', 'river',
  'sunset', 'tiger', 'umbrella', 'valley', 'window', 'yellow',
  'zebra', 'anchor', 'bridge', 'castle', 'diamond', 'elephant',
  'forest', 'galaxy', 'hammer', 'iceberg', 'jasmine', 'knight',
  'laptop', 'mango', 'nickel', 'orchid', 'panda', 'quartz',
  'rabbit', 'silver', 'thunder', 'unicorn', 'violet', 'whale'
]

/**
 * Generate a 3-word passphrase for magic link authentication
 * Returns an array of 3 random words
 */
export function generatePassphrase(): string[] {
  const words: string[] = []
  const usedIndices = new Set<number>()

  while (words.length < 3) {
    const index = Math.floor(Math.random() * WORDLIST.length)
    if (!usedIndices.has(index)) {
      words.push(WORDLIST[index])
      usedIndices.add(index)
    }
  }

  return words
}

/**
 * Validate that the entered passphrase matches the expected one
 * Case-insensitive comparison
 */
export function validatePassphrase(
  entered: string[],
  expected: string[]
): boolean {
  if (entered.length !== expected.length) return false

  return entered.every((word, index) =>
    word.toLowerCase().trim() === expected[index].toLowerCase().trim()
  )
}

/**
 * Format passphrase for display
 */
export function formatPassphrase(words: string[]): string {
  return words.join(' • ')
}
