from django.urls import re_path, include
from . import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
                  re_path(r'^productos/$', views.productos_api),
                  re_path(r'^productos/([0-9]+)$', views.productos_api),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)