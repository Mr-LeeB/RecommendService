'use strict';

import _ from 'lodash';
import { Types } from 'mongoose';

const convertToObjectIDMongoDB = (id: string) => new Types.ObjectId(id);
const getSelectData = (select: string[]) => {
  return Object.fromEntries(select.map((item) => [item, 1]));
};
export { getSelectData, convertToObjectIDMongoDB };
