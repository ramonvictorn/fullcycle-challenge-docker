
FROM golang AS builder

WORKDIR /go

COPY . .

RUN ls

RUN go build main.go

RUN ls

FROM scratch

COPY --from=builder /go/main .

ENTRYPOINT [ "./main"]