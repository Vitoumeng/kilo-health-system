import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  reqCreatePost,
  reqDeletePost,
  reqGetPost,
  reqGetPostById,
  reqUpdatePost,
} from "./request";
import { setPost, setPostDetails } from "./reducer";
import Swal from "sweetalert2";
import moment from "moment";
import { reqCreateFile } from "../../file-upload/core/request";
import React, { useState, useRef } from "react";

const usePost = () => {
  const post = useSelector((state) => state.post);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPost = (size = 20, page = 1, search = "") => {
    return reqGetPost({ size: size, page: page, quewy: search })
      .then((res) => {
        // console.log(res.data);
        dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      background: "#222525",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "lightcoral",
      cancelButtonColor: "lightgrey",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        reqDeletePost(id)
          .then(() => {
            Swal.fire({
              background: "#222525",
              color: "#fff",
              icon: "success",
              title: `Delete post ${id}`,
              text: "Successfully deleted",
            });
            fetchPost();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              background: "#222525",
              color: "#fff",
              text: "Error deleting post",
            });
            console.log(err);
          });
      }
    });
  };

  const handleFileChangeAdd = (
    e,
    setError,
    setPayload,
    payload,
    fileInputRef,
    setPreview
  ) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        setPreview(null);
        return;
      }
      setError(null);
      setPayload({ ...payload, file: selectedFile });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeAdd = (e, payload, setPayload) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onCreatePost = async (e, payload) => {
    e.preventDefault();

    const formattedPublicAt = moment(payload.publicAt).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const updatedPayload = { ...payload, publicAt: formattedPublicAt };

    const formData = new FormData();

    if (!payload) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: "Please upload a file.",
      });
      return;
    }

    try {
      formData.append("files", updatedPayload.file);

      const fileResponse = await reqCreateFile(formData);
      const mediaId = fileResponse.data?.data?.[0]?.id;

      if (!mediaId) {
        Swal.fire({
          icon: "error",
          background: "#222525",
          color: "#fff",
          title: "Oops...",
          text: "mediaId is null. Please upload again.",
        });
      }

      await reqCreatePost({ ...updatedPayload, mediaId: mediaId });
      Swal.fire({
        background: "#222525",
        color: "#fff",
        icon: "success",
        title: "Post Created",
        text: "Post has been successfully created!",
      });
      navigate("/post");
    } catch (err) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: err?.message,
      });

      console.error("Error details:", err.response?.data);
    }
  };

  const fetchPostById = (id) => {
    return reqGetPostById(id)
      .then((res) => {
        // console.log(res.data.data);
        const postData = res.data.data;
        const updatePostDetails = {
          ...postData,
          mediaId: postData.fileMedia?.id || null,
        };
        dispatch(setPostDetails(updatePostDetails));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChangeEdit = (
    e,
    setError,
    setPayload,
    payload,
    fileInputRef,
    setPreview
  ) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError(
          `File size is ${fileSizeInMB.toFixed(2)}MB; must be under 1MB.`
        );
        fileInputRef.current.value = "";
        setPreview(null);
        return;
      }
      setError(null);
      setPayload({ ...payload, file: selectedFile });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeEdit = (e, payload, setPayload) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onUpdatePost = async (e, payload) => {
    e.preventDefault();

    if (!payload.file) {
      Swal.fire({
        icon: "error",
        background: "#222525",
        color: "#fff",
        title: "Oops...",
        text: "Please upload a file.",
      });
      return reqUpdatePost(payload.id, payload)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Edit Post",
            text: "Successfully edited",
          });
          fetchPostById(payload.id);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Editing user",
          });
          console.log(err);
        });
    } else {
      const formData = new FormData();
      formData.append("files", payload.file);

      try {
        const fileRes = await reqCreateFile(formData);
        const mediaId = fileRes.data?.data?.[0]?.id;

        if (!mediaId) {
          Swal.fire({
            icon: "error",
            background: "#222525",
            color: "#fff",
            title: "Oops...",
            text: "mediaId is null. Please upload again.",
          });
          return;
        }

        await reqUpdatePost(payload.id, { ...payload, mediaId: mediaId });
        Swal.fire({
          background: "#222525",
          color: "#fff",
          icon: "success",
          title: "Post Updated",
          text: "Post has been successfully updated!",
        });

        fetchPostById(payload.id);
      } catch (err) {
        Swal.fire({
          icon: "error",
          background: "#222525",
          color: "#fff",
          title: "Oops...",
          text: err?.message || "Something went wrong. Please try again.",
        });
        console.error("Error details:", err.response?.data || err);
      }
    }
  };

  return {
    ...post,
    fetchPost,
    navigate,
    onDeletePost,
    onCreatePost,
    handleChangeAdd,
    handleFileChangeAdd,
    fetchPostById,
    handleChangeEdit,
    handleFileChangeEdit,
    onUpdatePost,
  };
};

export default usePost;
