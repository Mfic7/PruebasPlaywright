Feature: Inicio de Sesión en Netflix con BDD

  Como usuario de Netflix
  Quiero iniciar sesión en mi cuenta
  Para poder ver películas y series

  @netflix
  Scenario Outline: Inicio de sesión exitoso en Netflix
    Given que estoy en la página de inicio de Netflix
    When me logueo con el usuario "<username>" y la contraseña "<password>"
    Then debería ver la pantalla de selección de perfiles

    Examples:
      | username            | password      |
      | auomarcos@gmail.com | ?Auomarcos1.  |

  @netflix
  Scenario Outline: Inicio de sesión fallido en Netflix
    Given que estoy en la página de inicio de Netflix
    When me logueo con el usuario "<username>" y la contraseña "<password>"
    Then debería ver un mensaje de error de inicio de sesión

    Examples:
      | username            | password         |
      | usuario@incorrecto.com | claveIncorrecta | 