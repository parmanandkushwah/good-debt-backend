const { Setting } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const settings = await Setting.findAll({ order: [['group', 'ASC'], ['key', 'ASC']] });
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json({ success: true, data: map, raw: settings });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updates = req.body;
    await Promise.all(Object.entries(updates).map(([key, value]) =>
      Setting.upsert({ key, value: String(value) })
    ));
    res.json({ success: true, message: 'Settings updated' });
  } catch (err) { next(err); }
};
