"""Módulo Setup."""
from setuptools import setup, find_packages

setup(
    name='flashcards',
    version='1.0.0',
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'flashcards=app.main:run'
        ],
    },
)
