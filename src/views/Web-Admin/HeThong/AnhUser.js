import React, { useState, useEffect } from 'react';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { storage } from '../../../firebase';
import { LinearProgress } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}));
// IMAGE USER ADMIN
function AnhUser({ _OnCheckUpdateImage }) {
  //Khỏi tạo _OnCheckUpdateImage true
  //khi nhấn cập nhập sẽ _OnCheckUpdateImage false để loại bỏ disabled
  const classes = useStyles();
  // IMAGE USER ADMIN
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [OnCheckUpdateImage, SetOnCheckUpdateImage] = useState(
    _OnCheckUpdateImage
  );
  useEffect(() => {
    SetOnCheckUpdateImage(_OnCheckUpdateImage);
  }, [_OnCheckUpdateImage]);

  const handChange = e => {
    try {
      const file = e.target.files[0];
      setName(e.target.files[0].name);
      if (file) {
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
          setError('');
          setImage(file);
        }
      } else {
        setError('Xin vui lòng chọn ảnh');
      }
    } catch (error) {
      console.error(error);
    }
  };
  storage
    .ref('images')
    .child('Admin.JPG')
    .getDownloadURL()
    .then(url => {
      setUrl(url);
    });

  const handleUpdate = () => {
    if (image) {
      SetonClickUpdate(false);
      const uploadTask = storage.ref(`images/Admin.JPG`).put(image);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(progress);
        },
        error => {
          setError(error);
        },
        () => {
          storage
            .ref('images')
            .child('images/Admin.JPG')
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              setProgress(0);
              console.log(url);
            });
        }
      );
    } else {
    }
  };

  const [onClickUpdate, SetonClickUpdate] = useState(true);
  return (
    <div>
      <div className="row">
        <div className="col ml-3">
          <div className="row">
            <div className="col">
              <Card className="mb-4">
                <div className="text-center">
                  <img
                    alt="..."
                    className="card-img-top"
                    src={url}
                    style={{ width: '100vh', height: '100vh', zoom: '0.45' }}
                  />
                </div>
              </Card>
            </div>
            <div className="col">
              <div className="text-right">
                <div className={classes.root}>
                  <span>
                    {!OnCheckUpdateImage
                      ? name.length === 0
                        ? 'Xin vui lòng chọn ảnh'
                        : name
                      : ''}
                  </span>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handChange}
                    disabled={OnCheckUpdateImage}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      disabled={OnCheckUpdateImage}>
                      {'Chọn ảnh'}
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disabled={OnCheckUpdateImage}
                    onClick={handleUpdate}>
                    {'Upload'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          {!OnCheckUpdateImage ? (
            <>
              <LinearProgress
                hidden={onClickUpdate}
                variant="buffer"
                value={progress}
                valueBuffer={progress + 10}
                className="mb-3"
              />
              <div className="text-center">
                <span hidden={onClickUpdate}>
                  {progress !== 100 ? 'Thực hiện lưu file ảnh '+ progress + ' % . . .' : 'Hoàn thành'}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnhUser;
