from urllib.parse import urlencode
from collections import OrderedDict
import time
import uuid
import hmac
import hashlib
import asyncio
import random
import websockets
import simplejson as json

PUBLIC_KEY = "your public key here"
SECRET_KEY = "your secret key here"


def sort_obj(payload):
    return OrderedDict(sorted(payload.items()))


def gen_nonce():
    return str(random.randint(10000000, 99999999))


def gen_uuid():
    return str(uuid.uuid4())


def gen_timestamp_13bit():
    return int(round(time.time() * 1000))


def build_sign_content(payload):
    return urlencode(sort_obj(payload))


def sign_payload(payload, token):
    content = build_sign_content(payload)
    payload["sign"] = hmac.new(
        bytes(token, encoding='utf8'),
        bytes(content, encoding='utf8'),
        hashlib.sha256,
    ).hexdigest()
    return payload


async def get_account_info(uri):
    async with websockets.connect(uri) as websocket:
        payload = {
            "action": "GetAccountInfo",
            "public_key": PUBLIC_KEY,
            "crid": gen_uuid(),
            "timestamp": gen_timestamp_13bit(),
            "nonce": gen_nonce(),
        }
        signed_payload = sign_payload(payload, SECRET_KEY)

        await websocket.send(json.dumps(signed_payload))

        msg = await websocket.recv()
        print(msg)


asyncio.get_event_loop().run_until_complete(
    get_account_info('wss://ws.btcc.com'))
