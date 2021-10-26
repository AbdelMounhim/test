# on ignore tout ce qui est pas ai ou jpeg
traitement()
{
echo "traitement "
cat $FIC  | jq ' .files[] | { id, content_type, license_date, download_url }' | awk '
BEGIN { FS=","}
/"id"/ { match($0, /"id": (.*)\,/, arr)  ; id = arr[1];  }
/"license_date"/ { match($0, /"license_date": \"(.*)\"\,/, arr)  ; license_date = arr[1];  }
/"content_type"/ {
        match($0, /"content_type": \"(.*)\"\,/, arr)  ;
        typ = arr[1];
        if (typ == "image/jpeg") ext="jpeg";
        if (typ == "application/illustrator") ext="ai";
        }
/"download_url"/ {
        match($0, /"download_url": \"(.*)\"/, arr)  ;
        url=arr[1];
        name = "AdobeStock_" id "." ext
        if (ext == "ai" || ext == "jpeg" ) print name "###" url "###" license_date
}
{
}
END {
}' > /tmp/liste_photos_a_downloader_${COMPTE}.txt
