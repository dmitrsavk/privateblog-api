import ImageModel from './ImageModel';

export default class Image {
  async get(req, res) {
    const data = await ImageModel.findOne({where: {id: 2}});
    res.set('Content-Type', 'image/jpeg');
    res.end(data.image, 'binary');
  }
}
