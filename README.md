Requisitos Previos:
Asegúrate de tener instalados los siguientes programas:
Python (3.x)
Node.js y npm
Angular CLI: Puedes instalarlo con npm install -g @angular/cli

Pasos:
1. Activar el Entorno Virtual
Dependiendo de tu sistema operativo, usa uno de los siguientes comandos para activar el entorno virtual:

Windows:
.\myenv\Scripts\activate
Unix/Linux o macOS:
source myenv/bin/activate

2. Instalar Dependencias
Asegúrate de que todas las dependencias necesarias estén instaladas ejecutando:
pip install -r requirements.txt

3. Ejecutar el Proyecto
para ejecutar el proyecto de Django tienes que ingresar el siguiente codigo:
cd DjangoAPI
seguido de:
python manage.py runserver

Para Angular(ubicado en la carpeta CrudFront):
cd angular16

ng serve

4. Crear un Nuevo Entorno Virtual (Opcional)
Si encuentras problemas con el entorno virtual existente, considera crear uno nuevo:

Desactiva el entorno actual:
deactivate
Crea y activa un nuevo entorno:
python -m venv myenv
source myenv/bin/activate  # Unix/Linux
myenv\Scripts\activate     # Windows
Instala las dependencias nuevamente:
pip install -r requirements.txt


