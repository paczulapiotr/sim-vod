interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

interface File {
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
}

interface VodSearchResult {
  totalCount: number;
  data: {
    videoTitle: string;
    videoGuid: string;
    duration: number;
    uploadDateTime: Date;
  }[];
}
