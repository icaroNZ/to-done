FROM hayd/alpine-deno:1.2.2

RUN deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.3.1/denon.ts

WORKDIR /usr/app
ADD . .

COPY deps.ts .
RUN deno cache --unstable deps.ts

ADD . .

ENTRYPOINT ["/root/.deno/bin/denon"]