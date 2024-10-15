import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FileManager = () => {

  const url = 'https://preview6690.herokuapp.com';
  const [fileList, setFileList] = useState([]);


  const getFileDataFromBackend = async () => {
    const res = await fetch(url + '/file/getall');
    // console.log(res.headers);
    // return;
    const data = await res.json();
    console.log(data);
    setFileList(data);
  }
  const deleteUser = async (id) => {
    console.log(id);
    const response = await fetch('http://localhost:5000/file/delete/' + id, { method: 'DELETE' })
    if (response.status === 200) {
      console.log('user deleted');
      toast.success('User Deleted 😒');
      getFileDataFromBackend();
    }
  }

  useEffect(() => {
    getFileDataFromBackend();
  }, [])


  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const fd = new FormData();
    fd.append("myfile", file);
    console.log('uploading File ...');


    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then(async (res) => {
      console.log(res.status);
      console.log(url + '/' + file.name);

      if (file.type.startsWith('video')) {
        fetch(url + '/util/gen-vid-preview', {
          method: 'POST',
          body: JSON.stringify({
            url: url + '/' + file.name
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            fetch(url + '/file/add', {
              method: 'POST',
              body: JSON.stringify({
                file: file.name,
                thumbnail: url + '/util/ret-vid-preview/' + data.previewid,
                createdAt: new Date()
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => {
              if (res.status === 200) {
                setTimeout(() => {
                  getFileDataFromBackend();
                }, 5000);
                toast.success("Image Uploaded!!", {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }
            })

          })

      } else {
        fetch(url + '/util/gen-doc-preview', {
          method: 'POST',
          body: JSON.stringify({
            url: url + '/' + file.name
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            fetch(url + '/file/add', {
              method: 'POST',
              body: JSON.stringify({
                file: file.name,
                thumbnail: url + '/util/ret-doc-preview/' + data.previewid,
                createdAt: new Date()
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => {
              if (res.status === 200) {
                getFileDataFromBackend();
                toast.success("Image Uploaded!!", {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }
            })

          })
      }


    });
  };

  const displayFiles = () => {
    return fileList.map(file => (
      <div class="col">
        <div class="card h-100">
          <img src={file.thumbnail} class="card-img-top" alt="Hollywood Sign on The Hill" />
          <div class="card-body">
            <h5 class="card-title">{file.file}</h5>
            <p class="card-text">
              {new Date(file.createdAt).toLocaleDateString()}
            </p>
           
            <button class="btn btn-outline-danger btn-rounded" data-mdb-ripple-color="dark" onClick={() => { deleteUser(file._id) }}>Delete</button>
          </div>
        </div>
      </div>
    ))
  }

  return (

    <div className='container'>
      <div className="card">
        <div className="card-body">
          <input className='form-control' onChange={uploadFile} type="file" />
          <br />
          <div class="container text-center">
            <div class="row row-cols-1 row-cols-md-4 g-4">
              {displayFiles()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileManager