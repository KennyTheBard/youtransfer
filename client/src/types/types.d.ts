
export type WetransferMessage = {
   id: string,
   state: string,
   transfer_type: number,
   shortened_url: string | null,
   recommended_filename: string,
   expires_at: Date,
   password_protected: boolean,
   uploaded_at: Date | null,
   expiry_in_seconds: number,
   size: number | null,
   deleted_at: Date | null,
   security_hash: string,
   from: string | null,
   message: string,
   number_of_downloads: number,
   display_name: string,
   files: WetransferFile[],
   recipients: WetransferRecipient[]
}

export type WetransferFile = {
   id: string,
   name: string,
   retries: number,
   size: number,
   item_type: string,
   chunk_size: number
}

export type WetransferRecipient = {
   email: string,
   transfer_downloaded: boolean,
   bounced: boolean
}

export type WetransferUploadMeta = {
   id: string,
   hash: string,
   key: string
}