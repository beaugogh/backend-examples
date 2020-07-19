import unittest
from app import app


class Test(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_root(self):
        response = self.app.get('/')
        assert response.status_code == 200
        assert b'works' in response.data

    def test_say_hello(self):
        response = self.app.get('/hello')
        assert response.status_code == 200
        assert b'hello' in response.data

    def test_say_hello_post(self):
        response = self.app.post('/hello', data='world')
        assert response.status_code == 200
        assert b'world' in response.data


if __name__ == '__main__':
    unittest.main()
