IMY220 - Project Deliverable 2
Docker:
    docker build -t junk .
    docker run --name junk -p 3000:3000 junk
    docker stop junk
    docker rm junk