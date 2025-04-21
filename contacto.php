<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = htmlspecialchars($_POST['nombre']);
  $email = htmlspecialchars($_POST['email']);
  $mensaje = htmlspecialchars($_POST['mensaje']);

  $para = "info@coningenio.com";
  $asunto = "Nuevo mensaje desde la landing page";
  $contenido = "Nombre: $nombre\nCorreo: $email\nMensaje:\n$mensaje";
  $headers = "From: $email";

  if (mail($para, $asunto, $contenido, $headers)) {
    echo "Mensaje enviado correctamente.";
  } else {
    echo "Hubo un error al enviar el mensaje.";
  }
}
?>
