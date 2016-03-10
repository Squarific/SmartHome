"""SmartHome URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin

from rest_framework.urlpatterns import format_suffix_patterns
from backend import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/twitter/$', views.TwitterLogin.as_view(), name='twitter_login'),
    url(r'^api/homes/$', views.HomeList.as_view()),
    url(r'^api/homes/(?P<pk>[0-9]+)/$', views.HomeDetail.as_view()),
    url(r'^api/sensors/$', views.SensorList.as_view()),
    url(r'^api/sensors/(?P<pk>[0-9]+)/$', views.SensorDetail.as_view()),
    url(r'^api/tags/$', views.TagList.as_view()),
    url(r'^api/tags/(?P<pk>[0-9]+)/$', views.TagList.as_view()),
    url(r'^api/data/home/(?P<home_id>[0-9]+)/$', views.HomeDataList.as_view()),
    url(r'^api/data/user/today/(?P<user_id>[0-9]+)/$', views.RecentUserDataList.as_view()),
    url(r'^api/data/user/last_month/(?P<user_id>[0-9]+)/$', views.DailyUserDataList.as_view()),
    url(r'^api/data/user/last_year/(?P<user_id>[0-9]+)/$', views.MonthlyUserDataList.as_view()),
    url(r'^api/data/user/past_years/(?P<user_id>[0-9]+)/$', views.YearlyUserDataList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
