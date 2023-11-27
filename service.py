from fastapi import FastAPI, Request, HTTPException
import openai
import os

app = FastAPI()

openai.api_key = "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"

model_engine = "text-davinci-002"


# openai.api_key = os.getenv("OPENAI_API_KEY")
# openai.Model.list()

@app.get("/{id}")
async def root(id):
    response = openai.Completion.create(
		engine=model_engine,
		prompt=id,
		max_tokens=1024,
		n=1,
		stop=None,
		temperature=0.5,
	)
    print(response.choices[0].text)
    
    return {"messagex": response.choices[0].text}

# @app.post("/chat/")
# async def create_item(request: Request):
#     item = await request.json()
#     print(item["prompt"])
#     return item

@app.get("/h/{id}")
async def read_item(id: int, q: str = None):
    print("flag1")
    print(id)
    if id is None:
        raise HTTPException(status_code=400, detail="ID is required")
    print("flag2")
    return {"message": id}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9559)
    

