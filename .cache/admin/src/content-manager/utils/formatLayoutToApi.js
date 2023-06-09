import get from 'lodash/get';
import omit from 'lodash/omit';

const formatLayoutToApi = ({ layouts, metadatas, ...rest }) => {
  const list = layouts.list.map((obj) => {
    if (obj.name) {
      return obj.name;
    }

    return obj;
  });
  const formattedMetadatas = Object.keys(metadatas).reduce((acc, current) => {
    const currentMetadatas = get(metadatas, [current], {});
    let editMetadatas = currentMetadatas.edit;

    if (editMetadatas.mainField) {
      editMetadatas = { ...editMetadatas, mainField: currentMetadatas.edit.mainField.name };
    }

    return {
      ...acc,
      [current]: {
        edit: editMetadatas,
        list: omit(currentMetadatas.list, ['mainField']),
      },
    };
  }, {});

  const edit = layouts.edit.map((row) =>
    row.map(({ name, size }) => ({
      name,
      size,
    }))
  );

  return {
    ...rest,
    layouts: { edit, list },
    metadatas: formattedMetadatas,
  };
};

export default formatLayoutToApi;
