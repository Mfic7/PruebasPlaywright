Feature: Inicio de Sesión en Gmail con BDD (Móvil)

  Como usuario de Gmail
  Quiero iniciar sesión en mi cuenta desde un dispositivo móvil
  Para poder revisar mi correo

  @gmail
  Scenario Outline: Inicio de sesión exitoso en Gmail
    Given que estoy en la página de inicio de Gmail en un móvil
    When me logueo en Gmail con el usuario "<username>" y la contraseña "<password>"
    Then debería poder acceder a mi bandeja de entrada

    Examples:
      | username            | password      |
      | auomarcos@gmail.com | ?Auomarcos1.  |

  @gmail
  Scenario Outline: Inicio de sesión fallido en Gmail
    Given que estoy en la página de inicio de Gmail en un móvil
    When me logueo en Gmail con el usuario "<username>" y la contraseña "<password>"
    Then debería recibir un error de autenticación

    Examples:
      | username            | password         |
      | usuario@incorrecto.com | claveIncorrecta | 