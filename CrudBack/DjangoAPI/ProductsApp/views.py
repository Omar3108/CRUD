from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import Productos
from .serializers import ProductosSerializer

# Create your views here.


@csrf_exempt
def productos_api(request, id=0):
    if request.method == 'GET':
        if id == 0:

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ProductsApp_productos")
                row = cursor.fetchall()
                return JsonResponse(list(row), safe=False)
        else:

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ProductsApp_productos WHERE ProductId = %s", [id])
                row = cursor.fetchone()
                if row is not None:
                    return JsonResponse(row, safe=False)
                else:
                    return JsonResponse({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        producto_data = JSONParser().parse(request)

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO ProductsApp_productos (NombreProducto, Gratuito, Precio, Stock, TiempoCreacion, FechaCreacion)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING ProductId
            """, [producto_data['NombreProducto'], producto_data['Gratuito'], producto_data['Precio'],
                  producto_data['Stock'], producto_data['TiempoCreacion'], producto_data['FechaCreacion']])
            new_id = cursor.fetchone()[0]
            if new_id:
                return JsonResponse({'ProductId': new_id}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({'message': 'Error al crear el producto'}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if id:
            producto_data = JSONParser().parse(request)

            with connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE ProductsApp_productos
                    SET NombreProducto = %s, Gratuito = %s, Precio = %s, Stock = %s, TiempoCreacion = %s, FechaCreacion = %s
                    WHERE ProductId = %s
                """, [producto_data['NombreProducto'], producto_data['Gratuito'], producto_data['Precio'],
                      producto_data['Stock'], producto_data['TiempoCreacion'], producto_data['FechaCreacion'], id])
                return JsonResponse({'message': 'Producto actualizado correctamente'}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        if id:

            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM ProductsApp_productos WHERE ProductId = %s", [id])
                return JsonResponse({'message': 'Producto eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return JsonResponse({'message': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)

    return JsonResponse({'message': 'Método HTTP no soportado'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)