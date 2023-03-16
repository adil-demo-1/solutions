
# Example usage of CDK - Lambda Deployment

Add new books:

`curl -X PUT https://API_GW_DOMAIN.execute-api.eu-west-1.amazonaws.com/prod/books -H 'Content-Type: application/json' -d '[{"title": "title1", "isbn": "888-888-888", "authors": "yaz1", "languages": "en", "countries": "tr, us", "numberOfPages": "123", "releaseDate": "12-03-2023"}, {"title": "title2", "isbn": "777-777-777", "authors": "yaz2", "languages": "en", "countries": "tr, us", "numberOfPages": "123", "releaseDate": "12-03-2023"}]'`

Get books:

`curl -X GET https://API_GW_DOMAIN.execute-api.eu-west-1.amazonaws.com/prod/books?isbn=777-777-777&isbn=888-888-888`

Update books:

`curl -X POST https://API_GW_DOMAIN.execute-api.eu-west-1.amazonaws.com/prod/books -H 'Content-Type: application/json' -d '[{"title": "title2", "isbn": "888-888-888", "authors": "yaz3", "languages": "tr", "countries": "tr", "numberOfPages": "456", "releaseDate": "12-03-2023"}, {"title": "title2", "isbn": "777-777-777", "authors": "yaz5", "languages": "tr", "countries": "tr", "numberOfPages": "456", "releaseDate": "12-03-2023"}]'`

Delete books:

`curl -X DELETE https://API_GW_DOMAIN.execute-api.eu-west-1.amazonaws.com/prod/books -H 'Content-Type: application/json' -d '[{"isbn": "777-777-777"}]'`
