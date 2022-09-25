import React, { FC, useState } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "./ChangeProfilePhotoProps";
import "./ChangeProfilePhoto.scss";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Upload } from "antd";
import { uploadFile } from "src/redux/file/actions";
import { FILE_UPLOAD } from "src/types/backendAndFrontendCommonTypes/constants";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { removeProfileFile } from "src/redux/user/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUserProfilePhotoUrl } from "src/helpers/user";

const b = cn("change-profile-photo");

function getInitialFileList(profilePhoto: string): UploadFile[] {
  if (profilePhoto) {
    return [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: getUserProfilePhotoUrl(profilePhoto),
      },
    ];
  }

  return [];
}

export const ChangeProfilePhoto: FC<Props> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const {
    user: { profilePhoto },
  } = state;

  const [fileList, setFileList] = useState<UploadFile[]>(
    getInitialFileList(profilePhoto)
  );

  const onChange: UploadProps["onChange"] = async ({ fileList }) => {
    if (fileList.length) {
      const uploadResult = unwrapResult(
        await dispatch(
          uploadFile({
            queryParams: { type: FILE_UPLOAD.USER_PROFILE_PHOTO },
            bodyParams: { file: fileList[0].originFileObj as Blob },
            urlParams: {},
          })
        )
      );
      if (uploadResult.url) {
        fileList[0].status = "success";
      }
    }

    setFileList(fileList);
  };

  async function onRemove() {
    const removeSuccess = unwrapResult(
      await dispatch(
        removeProfileFile({ queryParams: {}, bodyParams: {}, urlParams: {} })
      )
    );

    if (removeSuccess) {
      setFileList([]);
    }
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className={classNames(b(), className)}>
      <ImgCrop rotate>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onRemove={onRemove}
          onPreview={onPreview}
          maxCount={1}
          customRequest={() => {}}
        >
          {fileList.length !== 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};
