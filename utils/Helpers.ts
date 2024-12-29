export function generateRandomPassword(length: number = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
}

export function capitalizeFirstLetter(word: string): string {
  return word.replace(/\w/, c => c.toUpperCase())
}

export async function checkIfPDF(ipfsUrl: string) {
  try {
    const response = await fetch(ipfsUrl, {
      method: 'HEAD',
    });

    // Check for the MIME type
    const contentType = response.headers.get('Content-Type');
    if (!contentType) {
      // console.error('No content type found');
      return false;
    }
    return contentType.includes('application/pdf');
  } catch (error) {
    // console.error('Error checking content type:', error);
    return false;
  }
};

export function getFormattedDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: 'short',
    year: 'numeric',
  })
}

export function getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
      return "good morning!";
  } else if (hour >= 12 && hour < 17) {
      return "good afternoon!";
  } else {
      return "good evening!";
  }
}