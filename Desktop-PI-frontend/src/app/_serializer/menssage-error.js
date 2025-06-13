export default function errorhandling(message) {
  if (message === 'error email already used') {
    return 'Email já cadastrado!'
  }

  if (message == 'fill in all fields') {
    return 'Preencha todos os campos!'
  }

  if (message == 'the passwords do not match') {
    return 'As senhas devem ser iguais!'
  }

  return 'Verifique os dados e tente novamente! '
}
