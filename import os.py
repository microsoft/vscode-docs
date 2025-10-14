import os
import sqlite3

ALLOWED_EXTENSIONS = {"pdf"}

def is_allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def sanitize_filename(filename):
    return "".join(c for c in filename if c.isalnum() or c in (" ", ".", "_")).rstrip()

def read_pdf_text(path):
    try:
        with open(path, "rb") as f:
            content = f.read()
            return content.decode("latin1")
    except Exception as e:
        print("Erro ao ler PDF:", e)
        return ""

def ensure_upload_folder(folder):
    os.makedirs(folder, exist_ok=True)

def with_connection(db_path, operation):
    def wrapper(*args, **kwargs):
        with sqlite3.connect(db_path) as conn:
            return operation(conn, *args, **kwargs)
    return wrapper

def create_fts_schema(conn):
    conn.execute("""
        CREATE VIRTUAL TABLE IF NOT EXISTS documents_fts USING fts5(
            docid UNINDEXED,
            content
        );
    """)

def insert_fts(conn, docid, content):
    conn.execute("INSERT INTO documents_fts(docid, content) VALUES(?, ?);", (docid, content))

def search_fts(conn, query):
    try:
        cursor = conn.execute("""
            SELECT docid, snippet(documents_fts, '<b>', '</b>', '...', -1, 64)
            FROM documents_fts
            WHERE documents_fts MATCH ?
            LIMIT 200;
        """, (query,))
        return cursor.fetchall()
    except Exception as e:
        print("Erro ao buscar:", e)
        return []

# Interfaces funcionais
create_fts_table = with_connection("app.db", create_fts_schema)
fts_insert = with_connection("app.db", insert_fts)
fts_search = with_connection("app.db", search_fts)

# Simulação de interface web via terminal
def main():
    ensure_upload_folder("uploads")
    create_fts_table()

    while True:
        print("\n📄 Aplicação Web Simulada")
        print("1. Enviar PDF")
        print("2. Buscar conteúdo")
        print("3. Sair")
        choice = input("Escolha uma opção: ")

        if choice == "1":
            path = input("Digite o caminho do arquivo PDF: ").strip()
            if not os.path.exists(path):
                print("❌ Arquivo não encontrado.")
                continue
            if not is_allowed_file(path):
                print("❌ Extensão não permitida.")
                continue

            filename = sanitize_filename(os.path.basename(path))
            content = read_pdf_text(path)
            if content:
                fts_insert(filename, content)
                print(f"✅ PDF '{filename}' indexado com sucesso.")
            else:
                print("⚠️ Nenhum conteúdo extraído.")

        elif choice == "2":
            query = input("Digite o termo de busca: ").strip()
            results = fts_search(query)
            if results:
                print(f"\n🔍 Resultados para '{query}':")
                for docid, snippet in results:
                    print(f"- {docid}: {snippet}")
            else:
                print("⚠️ Nenhum resultado encontrado.")

        elif choice == "3":
            print("👋 Encerrando aplicação.")
            break
        else:
            print("❌ Opção inválida.")

if __name__ == "__main__":
    main()
