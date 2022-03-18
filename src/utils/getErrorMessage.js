export const getErrorMessage = (code) => {
  switch (code) {
    case 'auth/wrong-password':
      return "Неверный пароль"
    case 'auth/user-not-found':
      return "Пользователь не найден"
    case 'auth/invalid-email':
      return 'Некорректный E-mail'
    case 'auth/weak-password':
      return 'Короткий пароль. Минимум 6 символов'
    case 'auth/email-already-in-use':
      return 'Данный E-mail уже зарегистрирован'
    // case '':
    //   return ''
    default: return "Неизвестная ошибка"
  }
}