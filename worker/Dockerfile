FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    VIRTUAL_ENV=/venv

RUN apt-get update && apt-get install -y --no-install-recommends \
      openssh-client \
      git \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir uv

RUN git clone --depth 1 --branch v2.0.1 https://github.com/trailofbits/algo.git /app/algo

RUN cd /app/algo \
    && uv pip install --quiet . \
    && uv pip install --quiet '.[digitalocean]' \
    && ansible-galaxy collection install \
         ansible.posix:==2.1.0 \
         'ansible.utils>=4.0.0' \
         community.general:==11.1.0 \
         'community.crypto>=3.1.1' \
         'community.digitalocean>=1.26.0'

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]