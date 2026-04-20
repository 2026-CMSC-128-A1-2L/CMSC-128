function Upload() {
  return (
    <div>
      <h1>Upload File</h1>
      <form action="/api/files" method="POST" encType="multipart/form-data">
        <label>
          File: <input type="file" name="file" />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
