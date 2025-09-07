export function checkUserStatus(): boolean {
    let token: string | null = localStorage.getItem('token')
    return token !== null && token.trim() !== '';
  }