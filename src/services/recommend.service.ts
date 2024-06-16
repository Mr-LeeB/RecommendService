import { TfIdf } from 'natural';
import Vector from 'vector-object';
import { UserClass } from '~/models/user.model';

interface IData {
  id: string;
  description: string;
}
interface IProcessedData {
  id: string;
  content: string;
}
interface IDocumentVector {
  id: string;
  vector: Vector;
}
interface ISimilarDocument {
  id: string;
  score: number;
}
class RecommendService {
  static recommendUSer = async (userID: string) => {
    const users = await UserClass.getAllUsers();

    const formattedData: IProcessedData[] = [];

    for (const user of users) {
      const tmpObj: IProcessedData = {
        id: user._id.toString(),
        content: user.tags.join(' ')
      };

      formattedData.push(tmpObj);
    }

    const documentVectors = this.createVectorsFromDocs(formattedData);
    const similarities = this.calcSimilarities(documentVectors);

    return similarities;
  };

  static formatData = (data: IData[][]) => {
    const formatted: IProcessedData[] = [];

    for (const [key, labels] of Object.entries(data)) {
      const desc = labels.map((l) => {
        return l.description.toLowerCase();
      });

      const tmpObj: IProcessedData = {
        id: key,
        content: desc.join(' ')
      };

      formatted.push(tmpObj);
    }

    return formatted;
  };

  static createVectorsFromDocs = (processedDocs: IProcessedData[]) => {
    const tfidf = new TfIdf();

    processedDocs.forEach((processedDocument) => {
      tfidf.addDocument(processedDocument.content);
    });

    const documentVectors = [];

    for (let i = 0; i < processedDocs.length; i += 1) {
      const processedDocument = processedDocs[i];
      const obj: { [key: string]: number } = {};

      const items = tfidf.listTerms(i);

      for (let j = 0; j < items.length; j += 1) {
        const item = items[j];
        obj[item.term] = item.tfidf;
      }

      const documentVector = {
        id: processedDocument.id,
        vector: new Vector(obj)
      };

      documentVectors.push(documentVector);
    }
    return documentVectors;
  };

  static calcSimilarities = (docVectors: IDocumentVector[]) => {
    // number of results that you want to return.
    const MAX_SIMILAR = 20;
    // min cosine similarity score that should be returned.
    const MIN_SCORE = 0.2;
    const data: { [key: string]: any[] } = {};

    for (let i = 0; i < docVectors.length; i += 1) {
      const documentVector = docVectors[i];
      const { id } = documentVector;

      data[id] = [];
    }

    for (let i = 0; i < docVectors.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        const idi = docVectors[i].id;
        const vi = docVectors[i].vector;
        const idj = docVectors[j].id;
        const vj = docVectors[j].vector;
        const similarity = vi.getCosineSimilarity(vj);

        if (similarity > MIN_SCORE) {
          data[idi].push({ id: idj, score: similarity });
          data[idj].push({ id: idi, score: similarity });
        }
      }
    }

    // finally sort the similar documents by descending order
    Object.keys(data).forEach((id) => {
      data[id].sort((a, b) => b.score - a.score);

      if (data[id].length > MAX_SIMILAR) {
        data[id] = data[id].slice(0, MAX_SIMILAR);
      }
    });

    return data;
  };

  static getSimilarDocuments = (id: string, trainedData: IDocumentVector[]) => {
    const similarDocuments = trainedData[id];

    if (similarDocuments === undefined) {
      return [];
    }

    return similarDocuments;
  };
}

export default RecommendService;
