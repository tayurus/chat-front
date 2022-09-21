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
import { useAppDispatch } from "src/redux/hooks";

const b = cn("change-profile-photo");

export const ChangeProfilePhoto: FC<Props> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList }) => {
    console.log("CHANGE");
    dispatch(
      uploadFile({
        queryParams: { type: FILE_UPLOAD.USER_PROFILE_PHOTO },
        bodyParams: { file: fileList[0].originFileObj as Blob },
        urlParams: {},
      })
    );
    setFileList(fileList);
  };

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
          onPreview={onPreview}
          maxCount={1}
        >
          {fileList.length !== 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};
