import Image from 'next/image';
import { ContentType } from 'pinata';
import React from 'react'

interface FilePreviewProps {
    contentType: ContentType;
    url?: string;
    file?: File | undefined;
}

const FilePreview: React.FC<FilePreviewProps> = ({ contentType, url, file }) => {
    // PDF
    if (contentType === "application/pdf") {
        return <iframe src={url} width="100%" height="500px" style={{ border: 'none' }} />
    }

    if (file) {
        // Image
        if (file.type.startsWith("image/")) {
            return <Image src={URL.createObjectURL(file)} alt={file.name} width={450} height={0} />
        // Audio
        } else if (file.type.startsWith("audio/")) {
            return (
                <audio controls>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the audio element.
                </audio>
            )
        // Video
        } else if (file.type.startsWith("video/")) {
            <video controls width="450">
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video element.
            </video>
        }
    
    // File preview from URL of the uploaded file
    } else if (url) {
        // Image
        if (contentType?.startsWith("image/")) return <Image src={url} alt={"Preview"} width={450} height={450} />
        // Audio
        if (contentType?.startsWith("audio/")) {
            return (
                <audio controls>
                    <source src={url} type={contentType} />
                    Your browser does not support the audio element.
                </audio>
            )
        }
        // Video
        if (contentType?.startsWith("video/")) {
            return (
                <video controls width="450">
                    <source src={url} type={contentType} />
                    Your browser does not support the video element.
                </video>
            )
        }
    }
}

export default FilePreview