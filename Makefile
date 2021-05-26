coverage:
	coverage run --source app -m unittest discover -v -s ./tests -p "test_*.py" && coverage report -m --fail-under=80

black:
	black --line-length 120 --target-version py37 app/

isort:
	isort app/

pydocstyle:
	pydocstyle
