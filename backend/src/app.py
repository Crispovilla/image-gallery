import cloudinary
from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary.uploader
from cloudinary import api

app = Flask(__name__)
CORS(app)

cloudinary.config(
    cloud_name="drltavyuh",
    api_key="576658625378316",
    api_secret="Us1LpinEZewvQnFxsWgGqBVUiik"
)


@app.route('/')
def index():
    return 'Welcome to my API!'


@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    try:
        response = cloudinary.uploader.upload(file, folder='uploads')
        return jsonify({'message': 'file uploaded', 'url': response['secure_url']}), 200
    except Exception as error:
        return jsonify({'error': error}), 500


@app.route('/images', methods=['GET'])
def get_images():
    try:
        response = api.resources(type='upload', prefix='uploads/')
        return jsonify({'message': 'images retrieves', 'images': response['resources']}), 200
    except Exception as error:
        return jsonify({'error': error}), 500


if __name__ == '__main__':
    app.run(debug=True)
